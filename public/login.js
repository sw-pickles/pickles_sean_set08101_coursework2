function storageAvailable(type)
{
	try
	{
		 var storage = window[type],
			x = '__storage_test__';
		 storage.setItem(x,x);
		 storage.removeItem(x);
		 console.log('sup');
		 return true;
	}
	catch (e)
	{
		 return e instanceof DOMException && (
		 e.code === 22 ||
		 e.code === 1014 ||
		 e.name === 'QuotaExceededError' ||
		 e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
		 storage.length !== 0;
	}
 }
 
 function get_username()
 {
	var user_details = document.getElementById('username').value 
	return user_details
 }
 
 function get_pass()
 {
	var user_pass = document.getElementById('password').value 
	return user_pass
 }
 
 function store_details(user_details, user_data)
 {
	 console.log('hello');
	 if (storageAvailable('localstorage'))
	 {
		 console.log('hi');
		 localstorage.setItem(user_details, user_data);
		 return true;
	 }
	 else
		 console.log('fuck');
 }
 
 function verifyDetails(user_details,user_pass)
 {
	 var pass = localstorage.getItem(user_details);
	 if (pass == user_pass)
	 {
		 console.log('success');
		 return true;
	 }
	 else
		 console.log('failed to verify user');
	 
 }
 
 function registerUser()
 {
	user_details = get_username();
	user_pass = get_pass();
	var verify = store_details(user_details,user_pass);
	if(verify)
	{
		console.log('New user ${user_details} has registered, please login');
		console.log(localstorage.getItem(user_details));
	}
	else
		console.log('User has already registered')
 }
 
 function loginUser(user_details,user_pass)
 {
	user_details = get_username();
	user_pass = get_pass();
	
	

 }
 
 
 
 
 