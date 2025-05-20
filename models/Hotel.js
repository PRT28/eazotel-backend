const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  ndid: {
    type: Buffer,
    required: true
  },
  domain: {
    type: String,
    required: true
  },
  template: {
    type: String,
    required: true
  },
  plan: {
    name: {
      type: String,
      required: true
    },
    activationDate: {
      type: Date,
      required: true
    },
    expiryDate: {
      type: Date,
      required: true
    }
  },
  onBoardinDate: {
    type: Date,
    required: true
  },
  hotelName: {
    type: String,
    required: true
  },
  hotelDescription: {
    type: String,
    required: true
  },
  hotelEmail: {
    type: String,
    required: true
  },
  hotelPhone: {
    type: String,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  hoteladdress: {
    pinCode: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    State: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },
  isVerified: {
    type: Boolean,
    required: true
  },
  dinabiteToken: {
    access_token: {
      type: String,
      required: true
    }
  },
  hotels: {
    type: Map,
    of: new mongoose.Schema({
      location: {
        type: String,
        required: true
      },
      pinCode: {
        type: String,
        required: true
      }
    }, {_id: false})
  },
  uId: {
    type: String,
    required: true
  },
  watiCreds: {
    tenantId: {
      type: String,
      required: true
    },
    watiAccessToken: {
      type: String,
      required: true
    }
  }
}, { timestamps: true });

const Hotel = mongoose.model('Zucks_profile', hotelSchema);

module.exports = Hotel;