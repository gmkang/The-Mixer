$(() => {
	console.log('JS OKAY!');

	function refreshIt() {
		location.reload();
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
	let ingredients = [];
	let measurements = [];

$('#ingredients > li').each(function(index) {
	let split = $(this).text().split('-');
	measurements.push(split[0]);
	ingredients.push(split[1]);
});

	const recipeData = {
		name: $('recipeName').text(),
		measurements: measurements.join(','),
		ingredients: ingredients.join(','),
		instructions: $('#instructions').text(),
		beverageType: $('#alcoholPref').text(),
		image: $('#img').attr('src')
	};


		$.ajax(window.location.pathname, {
			method: 'POST',
			data: recipeData,
			success: data => {
				window.location.href = `/recipes/${data.id}`;
		},
			error: err => console.log(err)
		});

});

// $('#delete').on('click', e => {
// 	e.preventDefault();
// 	console.log('deleted!')
// }
// 	console.log('Deleting Drink!')
// 	const id = $('event.target')
// 	$.ajax({
// 		url: `/tasks/show/${id}`,
// 		type: 'DELETE',
// 		success: (data) => {
// 			$('#delete[data-id=${id}]').remove();
// 		},
// 		error: (err) => {
// 			console.log(err);
// 		}
// 	})
// }
// 		method: 'DELETE', 
// 		url: $(this).data('url')
// 		success: data => {

// 			window.location.href = '/tasks/{data.id}';
// 		}
// 		error: err => console.log(err)
// 	})
// })









});