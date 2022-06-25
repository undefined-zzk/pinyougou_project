const express = require('express');
const app = express();

const useRouter = require('./router/router');

const cors = require('cors');
app.use(cors());

//对表单数据进行解析
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', useRouter);

app.listen(80, function() {
    console.log('http://127.0.0.1');
})