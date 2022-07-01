import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      //required: true,
      default: '',
    },
    password: {
      type: String,
      required: true,
    },
    recoveryCode: {
      type: String,
      required: true,
    },
    wallet: {
      type: String,
      required: true,
      // remove in future
      default: '1JMcNNwQeNoFNeVPDUKmX5oFF8mqo6j3Nx',
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
    },
    rateIn: {
      type: Number,
      required: true,
      default: 0,
    },
    rateOut: {
      type: Number,
      required: true,
      default: 0,
    },
    ref: {
      type: String,
      required: true,
      default: 'organic',
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: false,
    },
    lastSeen: {
      type: Number,
      required: true,
      default: Date.now(),
    },
    // ids Of game user participate
    // games: {
    //   type: Array,
    //   required: true,
    //   default: [],
    // },
    games: [
      {
        g_id: { type: Number, required: true }, //game id
        field: { type: String, required: true },
        bet: { type: Number, required: true },
        gain: { type: Number, required: true, default: 0 },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
};

// userSchema.methods.matchRecovery = async function (code) {
//   return await bcrypt.compare(code, this.recoveryCode)
// };

// On password change
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  };

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// // On name change / means register
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('recoveryCode')) {
//     next();
//   };

//   const salt = await bcrypt.genSalt(10);
//   this.recoveryCode = await bcrypt.hash(this.recoveryCode, salt);
// });

const User = mongoose.model('User', userSchema);

export default User;
