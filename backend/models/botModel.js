import mongoose from 'mongoose';

const botSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // which to select from strategy
    gameIndex: {
      type: Number,
      required: true,
      default: 0,
    },
    // if bot made bet for this game true/false (make false before every new game)
    isBetMade: {
      type: Boolean,
      required: true,
      default: false,
    },
    strategyName: {
      type: String,
      required: true,
    },
    strategy: [
      {
        field: { type: String, required: true },
        bet: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);


// botSchema.pre('save', async function (next) {
//   if (!this.isModified('gameIndex')) {
//     next();
//   };

//   if (this.gameIndex >= this.strategy.length) {
//     this.deleteOne({ _id: this._id });
//   }
// });

const Bot = mongoose.model('Bot', botSchema);

export default Bot;
