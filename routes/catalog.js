const express = require('express'),
	router = express.Router(); 

router.get("/:id/section/:part", (req, res) => {
  const info = "catalog: " + req.params.id + " section: " + req.params.part;
  res.send(info);
});


module.exports = router; 