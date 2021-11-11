const controller = require("./account.controller");

/**
 * @swagger
 * tags:
 *   name: account
 *   description: account management
 */
const Router = require("express").Router();

// TODO: swagger fix
/**
 * @swagger
 * paths:
 *  /api/account/signUp:
 *    post:
 *      summary: Select User
 *      tags: [account]
 *      parameters:
 *         - in: body
 *           name: body
 *           required: true
 *           schema:
 *             $ref: '#/components/schemas/account'
 *      responses:
 *        "200":
 *          description: A account schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/account'
 */
Router.post("/signUp", controller.signUp);

Router.post("/login", controller.login);

Router.post("/logout", controller.logout);

Router.get("/findID", controller.findID);

Router.get("/findPW", controller.findPW);

Router.get("/changePW", controller.changePW);

Router.get("/printAccounts", controller.printAccounts);

Router.get("/test", controller.test);

module.exports = Router;
