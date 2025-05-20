const BookingRequest = require('../models/BookingRequest');

// Create a new lead
const createLead = async (req, res) => {
  try {
    const lead = await BookingRequest.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        lead,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const getAllLeads = async (req, res) => {
  try {
    const leads = await BookingRequest.find({ndid: req?.user?.hotelId});
    res.status(200).json({
      status: 'success',
      results: leads.length,
      data: {
        leads,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const getLead = async (req, res) => {
  try {
    const lead = await BookingRequest.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({
        status: 'fail',
        message: 'Lead not found',
      });
    }
    if(lead.ndid !== req.user.hotelId){
      return res.status(403).json({
        status: 'fail',
        message: 'You are not authorized to access this lead',
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        lead,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const updateLead = async (req, res) => {
  try {
    const lead = await BookingRequest.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!lead) {
      return res.status(404).json({
        status: 'fail',
        message: 'Lead not found',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        lead,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Delete a lead by ID
const deleteLead = async (req, res) => {
  try {
    const lead = await BookingRequest.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({
        status: 'fail',
        message: 'Lead not found',
      });
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const updateLeadStatus = async (req, res) => {
  try {

    const status = ['Open', 'Closed', 'Pending']

    if (req.body.status && !status.includes(req.body.status)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid status',
      });
    }
    if (!req.body.status) {
      return res.status(400).json({
        status: 'fail',
        message: 'Status is required',
      });
    }
    console.log(req.body.status);

    const lead = await BookingRequest.findByIdAndUpdate(req.params.id, { status: req.body.status }, {
      new: true,
      runValidators: true,
    });
    if (!lead) {
      return res.status(404).json({
        status: 'fail',
        message: 'Lead not found',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        lead,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};


module.exports = { createLead, getAllLeads, getLead, updateLead, deleteLead, updateLeadStatus }
