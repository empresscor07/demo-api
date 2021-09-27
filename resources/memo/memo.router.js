//contains the paths to interact with resource memo
import {request, Router} from 'express';
import fs from 'fs';

const router = Router();
let memosArray;
let memoParsed;
let memoParsedList;
let memoList = fs.readFileSync('log.json', 'utf8', (err, data) => {
  //  let alreadyRecorded = false;
    if (err) throw err;
    return logFile
});
memoParsed = JSON.parse(memoList);
memoParsedList = memoParsed.memo_list;

router.post('/', (req, res) => {
    const timeId = new Date().getTime();
    const timeIdString = timeId.toString();
    const memo = {
        id: timeIdString,
        message: req.body.message
    };
    console.log(memo);

    console.log(memoParsedList);
    memoParsed = JSON.parse(memoList);
    memoParsedList = memoParsed.memo_list;
    console.log(memoParsedList);
    memoParsedList.push(memo);
    console.log(memoParsedList);
    memoParsed = { memo_list: memoParsedList };
    memoList = JSON.stringify(memoParsed);


    fs.writeFile('log.json', memoList, (err, data) => {
        if (err) throw err;
        console.log('file updated');
    });

    //our message back
    res.send({
        message: 'created'
    })
});

router.get('/', (req, res) => {
    console.log('page opened')
    res.send(memoList);
});

router.get('/:id', (req, res) => {
    console.log(req.params);

    const memo = memoParsedList.find((memo) => {
       return memo.id == req.params.id
    })
    memoParsed = { memo_list: memoParsedList };
    memoList = JSON.stringify(memoParsed);
    res.send(memo);
});

//put is an update - need its id
router.put('/:id', (req, res) => {
    const memo = memoParsedList.find((memo) => {
        return memo.id == req.params.id
    })
    //update at this id to the new message sent by client
    memo.message = req.body.message;
    memoParsed = { memo_list: memoParsedList };
    memoList = JSON.stringify(memoParsed);
    fs.writeFile('log.json', memoList, (err, data) => {
        if (err) throw err;
        console.log('file updated');
    });
    //tell them it was updated
    res.send({
        message: 'updated'
    })
});

//delete
router.delete('/:id', (req, res) => {

    const index = memoParsedList.findIndex((memo) => {
        return memo.id == req.params.id
    })
    memoParsedList.splice(index, 1);
    memoParsed = { memo_list: memoParsedList };
    memoList = JSON.stringify(memoParsed);
    fs.writeFile('log.json', memoList, (err, data) => {
        if (err) throw err;
        console.log('file updated');
    });
    res.send({
        message: 'deleted'
    })
});

//exports our variable
export default router;