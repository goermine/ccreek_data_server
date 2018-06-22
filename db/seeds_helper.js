function timeGenerator(initialDate = new Date(2018, 5, 19, 3, 42)){
    let currentDate = new Date();
    return new Date(initialDate.getTime() + Math.random() * (currentDate.getTime() - initialDate.getTime()));
    // .toLocaleTimeString('en-US');
    // replace(/:\d+ /, ' ') for avoid seconds        
}

module.exports = {
    timeList: (items = 1) => {
        let timeSet = [];
        for(let i = 0; i < items; i++){
            timeSet.push(timeGenerator());
        }
        return timeSet; 
    } 
};

 

