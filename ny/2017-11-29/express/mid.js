module.exports = function(req, res, next){
	console.log("inside middle ware");
	req.info1 = req.info + " mid";
	next();
}
