import { NextFunction, Request, Response } from "express";
import { LedgerModel } from "../model/ledger.model";
import mongoose from "mongoose";

import { createAppError } from "../utils/appError";
import {
  findAllLedger,
  findOneLedger,
  findUnique,
  createLedger,
  updateLedger,
  deleteLedger,
} from "../services/ledger.services";

export const findAllLedgerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let query = req.query;

    if(query.fromdate && query.todate ){
      let newquery = {
        createdAt: {
          $gte: query.fromdate,
          $lte: query.todate,
        },
      }
      query['createdAt'] = newquery['createdAt'];
      delete query['fromdate']; 
      delete query['todate']; 
    }
    
    const ledger = await findAllLedger(query);
    if (ledger) {
      res.status(200).json({
        data: ledger,
        message: "Ledger Retrived Successfully",
      });
    } else {
      throw new Error("Data Not Found");
    }
  } catch (err) {
    next(err);
  }
};

export const findOneLedgerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const ledger = await findOneLedger(id);
    if (ledger) {
      res.status(200).json({
        data: ledger,
        message: "Ledger Retrived Successfully",
      });
    } else {
      throw new Error("Data Not Found");
    }
  } catch (err) {
    next(err);
  }
};

export const createLedgerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let payload = req.body;

    const allLedger = await findAllLedger({ branch: payload.branch });
    const latestLedger = allLedger[0];
    let branchBalance = latestLedger ? latestLedger.branchBalance : 0;
    if (payload.type === "Debit" && payload.amount > branchBalance) {
      throw new Error(
        `Debit amount exceeds current  balance. Availble Balance - ${branchBalance}CHF`
      );
    }

    const ledger = await createLedger({
      branch: payload.branch,
      category: payload.category,
      txnNo: payload.txnNo,
      refNo: payload.refNo,
      txnDate: payload.txnDate,
      description: payload.description,
      type: payload.type,
      amount: payload.amount,
      branchBalance: 0,
      createdBy: payload.createdBy,
    });
    if (ledger) {
      res.status(200).json({
        data: ledger,
        message: "Ledger Created Successfully",
      });
    } else {
      throw new Error("Ledger Creation Failed");
    }
  } catch (err) {
    next(err);
  }
};
export const updateLedgerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    let payload = req.body;
    const ledger = await updateLedger(id, payload);
    if (ledger) {
      res.status(200).json({
        data: ledger,
        message: "Ledger Updated Successfully",
      });
    } else {
      throw new Error("Ledger Update Failed");
    }
  } catch (err) {
    next(err);
  }
}
export const deleteLedgerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const ledger = await deleteLedger(id);
    console.log("ledger", ledger);
    if (ledger) {
      res.status(200).json({
        data: ledger,
        message: "Ledger Deleted Successfully",
      });
    } else {
      throw new Error("Data Not Found");
    }
  } catch (err) {
    next(err);
  }
};

export const ledgerReportController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const period = req.query.period || "1D";
    let fromDate = new Date();
    let toDate = new Date();
    switch (period) {
      case "7D":
        fromDate.setDate(fromDate.getDate() - 7);
        break;
      case "1M":
        fromDate.setMonth(fromDate.getMonth() - 1);
        break;
      case "6M":
        fromDate.setMonth(fromDate.getMonth() - 6);
        break;
      case "1Y":
        fromDate.setFullYear(fromDate.getFullYear() - 1);
        break;
      default:
        break;
    }
    fromDate.setHours(0, 0, 0, 0);
    toDate.setHours(23, 59, 59, 999);
    const matchCondition: any = {
      createdAt: {
        $gte: fromDate,
        $lt: toDate,
      },
    };

    if (req.query.branch && typeof req.query.branch === "string") {
      matchCondition.branch = new mongoose.Types.ObjectId(req.query.branch);
    }
    console.log("matchCondition", matchCondition);

    const ledger = await LedgerModel.aggregate([
      {
        $match: matchCondition,
      },
      {
        $group: {
          _id: null,
          totalIncome: {
            $sum: {
              $cond: [{ $eq: ["$type", "Credit"] }, "$amount", 0],
            },
          },
          totalDebit: {
            $sum: {
              $cond: [{ $eq: ["$type", "Debit"] }, "$amount", 0],
            },
          },
        },
      },
    ]);
    console.log("ledger", ledger);
    let output = {
      matchCondition,
      income: 0,
      expense: 0,
    };

    if (ledger.length > 0) {
      output = {
        matchCondition,
        income: ledger[0].totalIncome || 0,
        expense: ledger[0].totalDebit || 0,
      };
    }
    res.status(200).json({
      data: output,
      message: "Ledger Retrived Successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const ledgerChartController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const today = new Date();
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11); // 12 months ago from today
    twelveMonthsAgo.setDate(1); // Set the date to the 1st day of the month
    twelveMonthsAgo.setHours(0, 0, 0, 0); // Set time to 00:00:00

    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    endOfMonth.setHours(23, 59, 59, 999); // Set time to 23:59:59:999

    const matchCondition: any = {
      createdAt: { $gte: twelveMonthsAgo, $lte: endOfMonth }, // Filter records for the past 12 months
      type: { $in: ["Credit", "Debit"] }, // Consider only "Credit" (Income) and "Debit" (Expense)
    };

    if (req.query.branch && typeof req.query.branch === 'string') {
      matchCondition.branch = new mongoose.Types.ObjectId(req.query.branch);
    }

    const result = await LedgerModel.aggregate([
      {
        $match: matchCondition
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%b %Y", date: "$createdAt" } // Group by month and year
          },
          totalIncome: {
            $sum: { $cond: [{ $eq: ["$type", "Credit"] }, "$amount", 0] }, // Calculate total income
          },
          totalExpense: {
            $sum: { $cond: [{ $eq: ["$type", "Debit"] }, "$amount", 0] }, // Calculate total expense
          },
        },
      },
      {
        $sort: { _id: 1 }, // Sort by month/year
      },
    ]);

    // Prepare data for chart
    const categories: any = [];
    const incomeData = [];
    const expenseData = [];

    // Loop through the result and fill the data arrays
    for (const entry of result) {
      categories.push(entry._id);
      incomeData.push(entry.totalIncome || 0);
      expenseData.push(entry.totalExpense || 0);
    }

    // Convert month and year strings to Date objects for sorting
    const sortedCategories = categories.map((category : any, index : any) => {
      const [month, year] = category.split(' ');
      return { date: new Date(`${month} 1, ${year}`), index };
    });

    // Sort categories array chronologically
    sortedCategories.sort((a: any, b: any) => a.date - b.date);

    // Reorder categories, incomeData, and expenseData arrays based on the sorted indices
    const sortedCategoryNames = [];
    const sortedIncomeData = [];
    const sortedExpenseData = [];

    for (const { index } of sortedCategories) {
      sortedCategoryNames.push(categories[index]);
      sortedIncomeData.push(incomeData[index]);
      sortedExpenseData.push(expenseData[index]);
    }

    // Fill missing months with zero values
    const monthsInLast12 = Array.from({ length: 12 }, (_, i) => {
      const month = new Date();
      month.setMonth(today.getMonth() - i);
      return month.toLocaleString('en-US', { month: 'short', year: 'numeric' });
    }).reverse();

    // Insert missing months dynamically
    for (const month of monthsInLast12) {
      if (!sortedCategoryNames.includes(month)) {
        const monthIndex = monthsInLast12.indexOf(month);
        sortedCategoryNames.splice(monthIndex, 0, month);
        sortedIncomeData.splice(monthIndex, 0, 0);
        sortedExpenseData.splice(monthIndex, 0, 0);
      }
    }

    // Response data
    const response = {
      categories: sortedCategoryNames,
      series: [
        { name: "Income", data: sortedIncomeData },
        { name: "Expense", data: sortedExpenseData },
      ],
    };

    res.status(200).json({
      data: response,
      message: "Ledger data retrieved successfully",
    });
  } catch (err) {
    next(err);
  }
};

