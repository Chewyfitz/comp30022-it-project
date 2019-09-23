// Sample code

// Get method
/*
router.get('/getData', (req, res) => {
	Data.find((err, data) => {
		if (err) return res.json({success: false, error: err});
		return res.json({success: true, data:data});
	});
});

// Update method - overwrite existing database data
router.post('/updateData', (req, res) => {
	const { id, update } = req.body;
	Data.findByIdAndUpdate(id, update, (err) => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success:true });
	});
});

// Delete method - remove existing data from the database
router.delete('/deleteData', (req, res) => {
	const { id } = req.body;
	Data.findByIDAndRemove(id, (err) => {
		if (err) return res.send(err);
		return res.json({ success: true });
	});
});

// Create method - create new data in the database
router.post('/putData', (req, res) => {
	let data = new Data();
	
	const { id, message } = req.body;
	
	if ((!id && id !== 0) || !message) {
		return res.json({
			success: false,
			error: 'INVALID INPUTS',
		});
	}
	data.message = message;
	data.id = id;
	data.save((err) => {
		if (err) return res.json ( { success: false, error: err });
		return res.json({ success: true });
	});
});
*/