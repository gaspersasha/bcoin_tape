import mongoose from 'mongoose';

 // maxBetsAmount 1st , 2nd, 3d playses..  could be mere then  1 player in 1 stage
 // bonus that runs every 1hour
const bonusSchema = mongoose.Schema(
  {
    //player id (could be user or bot)
    firstPlace: [
      { 
        p_id : { type: mongoose.Schema.Types.ObjectId },
        name: { type: String, required: true },
        totalBet: { type: Number, required: true },
        bonusAmount: { type: Number, required: true }
      }
    ], 
    secondPlace: [
      { 
        p_id : { type: mongoose.Schema.Types.ObjectId },
        name: { type: String, required: true },
        totalBet: { type: Number, required: true },
        bonusAmount: { type: Number, required: true }
      }
    ], 
    thirdPlace: [
      { 
        p_id : { type: mongoose.Schema.Types.ObjectId },
        name: { type: String, required: true },
        totalBet: { type: Number, required: true },
        bonusAmount: { type: Number, required: true }
      }
    ], 
  },
  {
    timestamps: true,
  }
);

const Bonus = mongoose.model('Bonus', bonusSchema);

export default Bonus;
