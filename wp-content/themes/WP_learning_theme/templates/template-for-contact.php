<?php
/*
* Template Name: Contact Template
*/
get_header();
?>

<div class="container contact">
	<div class="row">
		<div class="col-md-3">
			<div class="contact-info">
				<h2>Contact Us</h2>
				<h4>We would love to hear from you !</h4>
			</div>
		</div>
		<div class="col-md-9">
			<div class="contact-form">
				<form action="<?php echo get_admin_url(); ?>admin-post.php" method="POST">
					<div class="form-group">
					  <label class="control-label col-sm-2" for="fname">Name:</label>
					  <div class="col-sm-10">          
						<input type="text" class="form-control" id="name" placeholder="Enter Name" name="name" value="<?php echo isset($user_name) ? $user_name : ''; ?>">
					  </div>
					</div>
					<div class="form-group">
					  <label class="control-label col-sm-2" for="number">Phone number:</label>
					  <div class="col-sm-10">
						<input type="text" class="form-control" id="number" placeholder="Enter number" name="number" value="<?php echo isset($user_number) ? $user_number : ''; ?>">
					  </div>
					</div>
					<div class="form-group">
					  <label class="control-label col-sm-2" for="email">Email:</label>
					  <div class="col-sm-10">
						<input type="email" class="form-control" id="email" placeholder="Enter email" name="email" value="<?php echo isset($user_email) ? $user_email : ''; ?>">
					  </div>
					</div>
					<div class="form-group">
					  <label class="control-label col-sm-2" for="password">Password:</label>
					  <div class="col-sm-10">
						<input type="text" class="form-control" id="password" placeholder="Enter password" name="password" value="<?php echo isset($user_password) ? $user_password : ''; ?>">
					  </div>
					</div>
					<div class="form-group">        
					  <div class="col-sm-offset-2 col-sm-10">
						<input type="submit" name="submit" id="submit" class="btn btn-default">
						<input type='hidden' name='action' value='add_and_update_user_data'/>
					  </div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<?php

function insert_user_data() {

	global $wpdb;

	// user table name
	$user_table_name = 'user_data';

	$user_data_id = isset( $_GET['id'] ) ? $_GET['id'] : '';

	// get selected school listing data from database
    $user_form_result = $wpdb->get_results( $wpdb->prepare( " SELECT * FROM `$user_table_name` WHERE id = '%d'", $user_data_id ), ARRAY_A );

    // check form result empty or not
    if ( ! empty( $user_form_result ) && isset( $user_form_result ) ) {
        foreach ( $user_form_result as $user_form_result_data ) {
            $user_name = $user_form_result_data['name'];
            $user_number = $user_form_result_data['number'];
            $user_email = $user_form_result_data['email'];
            $user_password = $user_form_result_data['password'];
        }
    }

    // get form data value using name attribute and store it in a variable
    $user_name = $_POST['name'];
    $user_number = $_POST['number'];
    $user_email = $_POST['email'];
    $user_password = $_POST['password'];

	if( isset( $_POST['submit'] ) ) {
		// Insert new school data into database table
        $insert_new_data = $wpdb->insert( $user_table_name, array(
                'id' => '',
                'name' => $user_name,
                'phone_number' => $user_number,
                'email' => $user_email,
                'password' => $user_password,
        ), array(
                '%d',
                '%s',
                '%s',
                '%s',
                '%s'
            )
        );

        //check insert new school variable return true or false.
        if ( $insert_new_data ) {
            echo "thank you for submit this form..";
        } else {
            echo "something is wrong..";
        }
        
        wp_safe_redirect( site_url( "/prj_online_shop/contact/" ) );
        exit();
	}
}
add_action( 'admin_post_add_and_update_user_data', 'insert_user_data' );

?>

<?php
get_footer();