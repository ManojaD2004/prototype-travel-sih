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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const express_1 = __importDefault(require("express"));
const redisConnection_1 = require("./redisConnection");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
const loginRequestSchema = zod_1.z.object({
    sessionId: zod_1.z.string(),
    email: zod_1.z.string().email()
});
function connectClient() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield redisConnection_1.client.connect();
            console.log('Connected to Redis');
        }
        catch (err) {
            console.error('Redis connection error:', err);
        }
    });
}
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    connectClient();
    const parsedResult = loginRequestSchema.safeParse(req.body);
    const { sessionId, email } = parsedResult.data;
    try {
        const key = `user-session:${sessionId}`;
        yield redisConnection_1.client.hSet(key, { email });
        res.status(200).json({ message: "Data stored successfully !" });
        let userSession = yield redisConnection_1.client.hGetAll(`user-session:${sessionId}`);
        console.log(JSON.stringify(userSession, null, 2));
    }
    catch (err) {
        console.error('Error storing user data:', err);
        res.status(500).json({ error: 'Server Error :( ' });
    }
}));
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
