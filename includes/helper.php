<?php
//function to include templates
function render($template, $data = array())
{
    $path = '../templates/'.$template.'.php';
    if(file_exists($path))
    {
        extract($data);
        require($path);
    }
}
?>
