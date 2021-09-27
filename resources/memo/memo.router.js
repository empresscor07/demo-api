//contains the paths to interact with resource memo
import {request, Router} from 'express';
import fs from 'fs';

const router = Router();
//read file and put into variable as a string
let memoList = fs.readFileSync('log.json', 'utf8', (err, data) => {
    if (err) throw err;
    return logFile
});
//parse the string into javascript object
let memoParsed = JSON.parse(memoList);
//take the list out of the memo_list object
let memoParsedList = memoParsed.memo_list;

router.post('/', (req, res) => {
    const timeId = new Date().getTime();
    const timeIdString = timeId.toString();
    const memo = {
        id: timeIdString,
        message: req.body.message
    };
    //converts to javascript object
    memoParsed = JSON.parse(memoList);
    //takes list out of object
    memoParsedList = memoParsed.memo_list;
    //adding new memo sent by user
    memoParsedList.push(memo);
    //displays updated list in console
    console.log(memoParsedList);
    //puts list back in object
    memoParsed = { memo_list: memoParsedList };
    //turn full and modified object back into a string
    memoList = JSON.stringify(memoParsed);

    //write updated string back into original file
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