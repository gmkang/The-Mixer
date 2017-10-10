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


// const saveRecipe = () => {
// 	$.ajax({
// 		url: '/',
// 		method: 'POST'
// 		data: {
			
// 		}
// 	})
// }
// })


$('#save').on('click', (e) => {
	e.preventDefault();
	console.log('save click');

	const recipeData = {
			name: $('#title').val(),
			measurements: $('#measurements').val(),
			ingredients: $('#ingredients').val(),
			instructions: $('#instructions').val(),
			beverageType: $('#beverageType').val(),
			image: $('#img_url').val()
		}
		console.log('save', recipeData)

		$.ajax('/tasks/', {
			method: 'POST',
			recipeData: recipeData,
			success: data => {
				window.location.href = `/recipes/show`;
		},
			error: err => console.log(err)
		});

})

// $('#delete').on('click', e => {
// 	e.preventDefault();

// 	console.log('Deleting Drink!')
// 	// const id = $('event.target').attr('data-id');
// 	$.ajax({
// 		method: 'DELETE', 
// 		url: $(this).data('url')
// 		success: data => {

// 			window.location.href = '/recipes/';
// 		}
// 		error: err => console.log(err)
// 	})
// })









});