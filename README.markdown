#Jquery Plugin - JQuery Slugme
###Converts a text from any html element to a slug format used to build a part of a url

#Prototypes
```javascript
$("observableElement").JquerySlugme("updatableElement");
$("observableElement").JquerySlugme("updatableElement",{ }); //options
$("observableElement").JquerySlugme("updatableElement",{ }, callback);
```

##Options

```javascript
defaults = {
    invalid: "",
    whiteSpace: "",
    dashes: "",
    prefixOut: "",
    keyboardHandler: "focusout"
};
```

##Example

```html
<html>
<head>
    <script type="text/javascript" src="jquery.slugme.js"></script>
</head>
<body>
    <label for="name"></label>
    <input type="text" name="name" value="" placeholder="type here">
    <br>
    <label for="urladdress"></label>
    www.domain.com/<input type="text" name="urladdress" id="urladdress" value="">
    <br>

    <script type="text/javascript">
        $(function(){
            $("#name").JquerySlugme("#urladdress");
            //or
            $("#name").JquerySlugme("#urladdress", { whitespace:"_" });
        }); 
    </script>
</body>
</html>