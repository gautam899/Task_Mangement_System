const moment = require("moment/moment")

//Here we will be using package "moment" that  is a lightweight javascript date library.It can be used to format date
const formatDate = (date)=>{
 return moment(date).format("DD/MM/YYYY");
};

export default formatDate;