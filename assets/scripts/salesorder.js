salesorder = {

	index: {
		init: function(){
			this._dataTables();
			this._deleteSO();
		},
		_dataTables: function(){
			$('#so-list').DataTable({
				'pageLength'	: 20,
				'sPageButton'	: 'btn btn-default',
				'aoColumnDefs'	: [
					{ 'bSortable' : false, 'aTargets' : [0, 7] }
				]
			});
		},
		_deleteSO: function(){
			$('#so-list').on('click', 'a.delete', function(e){
				e.preventDefault();
				var el = $(this);

				LIBS.callModal('#basic', {
					'title'			: 'Confirmation',
					'body'			: 'Do you really want to delete this Sales Order?',
					'doAction'		: function(){
						window.location.href = el.attr('href');
					},
					'doSomething'	: function(){
						$('#basic button.true').removeClass('blue').addClass('red').html('<i class="fa fa-trash-o"></i> Delete');
					}
				});
			});
		}
	},

	add: {
		init: function(){
			this._datePickerInit();
			this._openCustomers();
		},
		_datePickerInit: function(){
			$('.date-picker').datepicker({
	            autoclose: true
	        });
		},
		_openCustomers: function(){
			var self = this;

			$('.open-cust').on('click', function(){
				$salesId = $('select[name="sales_id"]');

				if($salesId.val() == ''){
					$salesId.css('border', '1px solid #ff0000');
					self._salesRemoveStyle();
				}else{
					$salesId.removeAttr('style');

					LIBS.callModal('#basic', {
						'title'			: 'Choose a Customer',
						'body'			: LIBS.callAjax('/customers/getData', 'sales_id=' + $salesId.val()),
						'doAction'		: function(){ },
						'doSomething'	: function(){
							$('#basic button.true').hide();
						}
					});

					self._customerFilter();
				}
			})
		},
		_salesRemoveStyle: function(){
			$('select[name="sales_id"]').on('change', function(){
				$(this).removeAttr('style');
			})
		},
		_customerFilter: function(){
			var doFilter = function(){
				var val = $('input[name="filter"]').val();
		    	    	
		        if(val == ''){ $('tr.cust-item').show(); }
		        else{
		        	$('tr.cust-item[data-cust-name*="' + val.toUpperCase() + '"]').show();
		            $('tr.cust-item:not([data-cust-name*="' + val.toUpperCase() + '"])').hide();
		        }
			};

	    	var timer = null;
	        $('input[name="filter"]').keydown(function(){
	        	clearTimeout(timer);
	            timer = setTimeout(doFilter, 700);
	        });
		}
	}

}