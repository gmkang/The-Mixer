$(() => {
	console.log('JS OKAY!');

	function refreshIt() {
		window.location.reload();
	}
	$('#refresh').click(refreshIt);


	$('#new-task').on('submit', (event) => {
		event.preventDefault();

		const newData = {
			name: $('#title').val(),
			measurements: $('#measurements').val(),
			ingredients: $('#ingredients').val(),
			instructions: $('#instructions').val(),
			beverageType: $('#beverageType').val(),
			image: $('#img_url').val()
		}

		$.ajax('/tasks/', {
			method: 'POST',
			data: newData,
			success: data => {
				window.location.href = `/recipes/${data.id}`;
			},
			error: err => console.log(err)
		});
	});


	$('#beverageEdit').on('submit', (event) => {
		event.preventDefault();

		const newData = {
			name: $('#edit-title').val(),
			measurements: $('#edit-measurements').val(),
			ingredients: $('#edit-ingredients').val(),
			instructions: $('#edit-instructions').val(),
			beverageType: $('#edit-beverageType').val(),
			image: $('#edit-image').val()
		};

		$.ajax(window.location.pathname, {
			method: 'PUT',
			data: newData,
			success: data => {
				window.location.href = `/recipes/${data.id}`;
			},
			error: err => console.log(err)
		});
	});


$('#delete').on('click', event => {
	event.preventDefault();

	console.log('Deleting Drink!')
	const id = $('event.target').attr('data-id');
	$.ajax(`tasks/${id}`, {
		method: 'DELETE', 
		success: data => {
			window.location.href = `/recipes/${data.id}`;
		}
		error: err => console.log(err)
	})
})









});