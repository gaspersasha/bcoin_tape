import mongoose from 'mongoose';

const gameSchema = mongoose.Schema(
  {
    // custum id
    g_id: { type: Number, required: true },

    // result of the game (num...)
    result: { type: String, required: true, },
    //finished, calc, progress
    status: { type: String, required: true },

    // is hourly bonus run ?
    isBonusRun: { type: Boolean, required: true,  default: false },
    //bonus is to link
    b_id: { type: mongoose.Schema.Types.ObjectId, required: false },

    bets: [
      {
        //username or bot name
        p_id: { type: mongoose.Schema.Types.ObjectId, required: true }, //player id (could be user or bot)
        name: { type: String, required: true },
        field: { type: String, required: true },
        bet: { type: Number, required: true },
        gain : { type: Number, required: true, default: 0 },
        isBot: { type: Boolean, required: true, default: false },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Game = mongoose.model('Game', gameSchema);

export default Game;
