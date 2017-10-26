<!DOCTYPE html>
<html>
    <head>
        <title>YelpCamp</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
        <link rel="stylesheet" href="/stylesheets/landing.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js" type="text/javascript" async></script>
    </head>
    <body>
    
    <div class="container">
        <% if(error && error.length > 0){ %>
            <div class="alert alert-danger" role="alert">
                <%= error %>
            </div>
        <% } %>
        <% if(success && success.length > 0){ %>
            <div class="alert alert-success" role="alert">
                <%= success %>
            </div>
        <% } %>
    </div>
    
    <div id="landing-header">
 		<h1>Welcome to YelpCamp!</h1>
		<a href="/campgrounds" class="btn btn-lg btn-success">View All Campgrounds</a>
    </div>
    
    <ul class="slideshow">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>

<% include partials/footer %>
