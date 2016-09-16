function medicationModelFactory(Model) {
  function MedicationModel(modelName, data) {
    Model.call(this, modelName, data);
  }

  MedicationModel.prototype = Object.create(Model.prototype);

  MedicationModel.prototype.getDrug = function() {
    var r;

    if (this.drug) {
      r = this.drug.name;

      if (this.drug.drugGroup) {
        r += ' (' + this.drug.drugGroup.name + ')';
      }
    } else {
      r = this.drugText;
    }

    return r;
  };

  MedicationModel.prototype.getDose = function() {
    var r;

    if (this.doseQuantity !== undefined && this.doseQuantity !== null) {
      r = this.doseQuantity;

      if (this.doseUnit) {
        r = r + ' ' + this.doseUnit.label;
      }
    } else {
      r = this.doseText;
    }

    return r;
  };

  return MedicationModel;
}

medicationModelFactory.$inject = ['Model'];

export default medicationModelFactory;
