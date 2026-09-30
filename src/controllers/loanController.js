import { LoanModel } from "../models/loanModel.js";

export const LoanController = {
  async getAll(req, res) {
    try {
      const { status } = req.query; // Menangkap filter query status
      const loans = await LoanModel.getAll(status);
      res.json({ success: true, data: loans });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const loan = await LoanModel.getById(req.params.id);
      res.json({ success: true, data: loan });
    } catch (err) {
      res.status(404).json({ success: false, error: err.message });
    }
  },

  async create(req, res) {
    try {
      const loan = await LoanModel.create(req.body);
      res.status(201).json({ success: true, data: loan });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  async update(req, res) {
    try {
      const loan = await LoanModel.update(req.params.id, req.body);
      res.json({ success: true, data: loan });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  async remove(req, res) {
    try {
      const result = await LoanModel.remove(req.params.id);
      res.json({ success: true, data: result });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  }
};
