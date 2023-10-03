/* Copyright (C) 2023 Kidiraliyev Rustam - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the XYZ license, which unfortunately won't be
 * written for another century.
 *
 * You should have received a copy of the XYZ license with
 * this file. If not, please write to: , or visit :
 */

exports.SuccessCallback = async (data, req, res, next) => {
    return res.json({
        status: true,
        data: data
    })
}
exports.ErrorCallback = async (error, req, res, next) => {
    return res.json({
        status: false,
        error: error
    })
}
//  Ulanmagan CallBacklar