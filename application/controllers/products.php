<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Products extends CI_Controller {

	public function index()
	{
		$data = array(
			'title'		=> 'Products',
			'content'	=> 'products/index'
		);

		$this->load->view('base', $data);
	}

}