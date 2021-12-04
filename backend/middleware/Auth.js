
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

class Auth {
    // với re là reqiure và res là response
    checkPermission(req, res, next) { //dùng try catch để bắt lỗi khi chưa đăng nhập/ chưa tìm thấy token (do checkPermission là xử lý đồng bộ)
        try {
            if (req.headers.authorization) {
                // console.log('1')
                const token = req.headers.authorization.split(" ")[1];
                const user = jwt.verify(token, 'user'); //_id, maLoaiNguoiDung
                //console.log(user)
                req.data = user;
                next()
            }
            else {
                const err = new Error('Vui lòng thực hiện đăng nhập');
                err.statusCode = 404
                return next(err)
            }

        } catch (err) { res.status(500).json('Vui lòng thử lại') };


    }
    checkAdmin(req, res, next) {
        if (req.data.maLoaiNguoiDung == '0')
            next();
        else {
            const err = new Error('Không có quyền truy cập chức năng này');
            err.statusCode = 404
            return next(err)
        }
    }
    checkUser(req, res, next) {
        if (req.data.maLoaiNguoiDung == '1')
            next();
        else {
            const err = new Error('Không có quyền truy cập chức năng này');
            err.statusCode = 404
            return next(err)
        }
    }


}
module.exports = new Auth;