import csv

from sqlalchemy import create_engine
import click


@click.command()
@click.argument('output', type=click.File('wb'))
@click.option('--host', default='localhost')
@click.option('--port', default=3306)
@click.option('--username', default='dbaccess')
@click.option('--password', required=True)
@click.option('--database', default='patientview')
def main(output, host, port, username, password, database):
    connection_string = 'mysql://{username}:{password}@{host}:{port}/{database}'.format(
        host=host,
        port=port,
        username=username,
        password=password,
        database=database,
    )
    db = create_engine(connection_string)

    schema = get_schema(db)
    schema_to_csv(schema, output)


def get_schema(db):
    """Gather information about the radar database."""

    # Get the radar columns
    rows = db.execute("""
        select
            table_name,
            column_name,
            data_type,
            is_nullable
        from information_schema.columns
        where
            table_schema = 'patientview' and
            (
                table_name = 'diagnosis' or
                table_name = 'medicine' or
                table_name = 'patient' or
                table_name like 'rdc_%%' or
                table_name like 'rdr_%%' or
                table_name like 'tbl_%%' or
                table_name = 'testresult' or
                table_name = 'unit' or
                table_name = 'user' or
                table_name = 'user_mapping'
            )
        order by table_name, ordinal_position
    """)

    schema = []

    # Loop through the columns
    for row in rows:
        table_name = row['table_name']
        column_name = row['column_name']
        data_type = row['data_type']
        is_nullable = row['is_nullable']

        print table_name, column_name

        total_rows = get_total_rows(db, table_name)

        # Skip doing further analysis on large tables
        if total_rows >= 1000000:
            distinct_rows = None
            not_null_rows = None
            not_empty_rows = None
            sample_values = None
        else:
            distinct_rows = get_distinct_rows(db, table_name, column_name)
            not_null_rows, not_empty_rows = get_completed_rows(db, table_name, column_name, data_type)
            sample_values = get_sample_values(db, table_name, column_name)

        column = dict(
            table_name=table_name,
            column_name=column_name,
            data_type=data_type,
            is_nullable=is_nullable,
            not_null_rows=not_null_rows,
            not_empty_rows=not_empty_rows,
            distinct_rows=distinct_rows,
            total_rows=total_rows,
            sample_values=sample_values
        )

        schema.append(column)

    return schema


def schema_to_csv(schema, output):
    """Save the schema as CSV."""

    writer = csv.writer(output)

    keys = [
        'table_name',
        'column_name',
        'data_type',
        'is_nullable',
        'total_rows',
        'distinct_rows',
        'not_null_rows',
        'not_empty_rows',
        'sample_values'
    ]

    writer.writerow(keys)

    for column in schema:
        output_row = []

        for k in keys:
            v = column[k]

            if isinstance(v, list):
                v = ', '.join(v)

            output_row.append(v)

        writer.writerow(output_row)


def get_total_rows(db, table_name):
    """Total number of rows in the table."""

    total_rows = db.execute("""
        select
            count(*)
        from `{table_name}`
    """.format(
        table_name=table_name
    )).fetchone()[0]

    return total_rows


def get_distinct_rows(db, table_name, column_name):
    """Number of distinct values for this column."""

    distinct_rows = db.execute("""
        select
            count(distinct `{column_name}`)
        from `{table_name}`
    """.format(
        table_name=table_name,
        column_name=column_name
    )).fetchone()[0]

    return distinct_rows


def get_completed_rows(db, table_name, column_name, data_type):
    """Get the number of rows that are not null or not empty (string types)."""

    # String type
    if data_type in ['varchar', 'text']:
        not_null_rows, not_empty_rows = db.execute("""
            select
                sum(case when `{column_name}` is not null then 1 else 0 end),
                sum(case when `{column_name}` != '' then 1 else 0 end)
            from `{table_name}`
        """.format(
            table_name=table_name,
            column_name=column_name,
        )).fetchone()
    else:
        not_null_rows = db.execute("""
            select
                sum(case when `{column_name}` is not null then 1 else 0 end)
            from `{table_name}`
        """.format(
            table_name=table_name,
            column_name=column_name,
        )).fetchone()[0]
        not_empty_rows = None

    return not_null_rows, not_empty_rows


def get_sample_values(db, table_name, column_name):
    """Sample a column's values."""

    # 5 random non-null values
    sample_rows = db.execute("""
        select distinct
            `{column_name}`
        from `{table_name}`
        where
            `{column_name}` is not null
        order by rand() limit 5
    """.format(
        table_name=table_name,
        column_name=column_name
    ))

    sample_values = []

    for sample_row in sample_rows:
        sample_value = str(sample_row[0])

        # Truncate long values
        if len(sample_value) > 10:
            sample_value = sample_value[:10] + '...'

        sample_values.append(sample_value)

    sample_values.sort()

    return sample_values


if __name__ == '__main__':
    main()