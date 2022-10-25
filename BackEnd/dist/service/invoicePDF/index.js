"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePdf = void 0;
const fs = require('fs');
const pdf = require('pdf-creator-node');
const path = require('path');
const options_1 = require("./option/options");
const generatePdf = (invoiceData) => __awaiter(void 0, void 0, void 0, function* () {
    const html = fs.readFileSync(path.join(__dirname, './html/invoice.html'), 'utf-8');
    const filename = Math.random() + "_doc" + ".pdf";
    const localFilePath = path.join(__dirname, './docs/') + filename;
    let document = {
        html: html,
        data: {
            products: invoiceData
        },
        path: localFilePath,
        type: ''
    };
    console.log("START CONVERT PDF");
    try {
        yield pdf.create(document, options_1.options);
    }
    catch (err) {
        console.log(err);
    }
    console.log("END CONVERT PDF");
    return { status: true, message: localFilePath };
});
exports.generatePdf = generatePdf;
