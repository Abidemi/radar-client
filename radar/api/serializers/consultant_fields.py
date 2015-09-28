from radar.api.serializers.meta import MetaSerializerMixin
from radar.lib.models import Consultant
from radar.lib.serializers.models import ReferenceField, ModelSerializer


class ConsultantSerializer(MetaSerializerMixin, ModelSerializer):
    class Meta(object):
        model_class = Consultant


class ConsultantReferenceField(ReferenceField):
    model_class = Consultant
    serializer_class = ConsultantSerializer
