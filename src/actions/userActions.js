import jwt from 'jsonwebtoken';
import {UserModel} from '../database/models'
import bcrypt from 'bcrypt';
const {SECRET} = require('../config/index');

// creamos una funcion para Date que nos regresa un nuevo date con N numero de dias agregados.
Date.prototype.addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

const createToken = (userData) => {
    const exp = new Date().addDays(5).getTime();
    const payload = {
      _id: userData._id,
      email: userData.email,
      name: userData.name,
      exp,
    }
  
    const token = jwt.sign(payload, SECRET);
    return { token }
  }
  
  
  export const createUser = async (userData) => {
    try {
      const newUser = await UserModel.create(userData);
      const token = createToken(newUser);
      return token;
    } catch (error) {
      return error;
    }
  };

  export const doLogin = async (email, pass) => {
    try {
      const user = await UserModel.findOne({ email })
      if (!user || !bcrypt.compareSync(pass, user.password)) { return null }
      return createToken(user)
    } catch (error) {
      return error;
    }
  }

  export const findUserAction = async (filter) => {
  try {
    return await UserModel.findOne(filter);
  } catch (error) {
    return error;
  }
}

  /*
  const doLoginAction = async (email, password) => {
    try {
      const user = await UserModel.findOne({ email });
      const token = createToken(user);
      return token;
    } catch (error) {
      return error;
    }
  }
  */