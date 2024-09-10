const mongoose = require('mongoose');

const selectedPlanSchema = new mongoose.Schema({
  plan:{
    type:Array
  },
  productId:{
    type:String
  }

});

module.exports  = mongoose.model('SelectedPlan', selectedPlanSchema);

