//global object
var global = {};

//regular expressions
var reg = {
    "sym": /^(?:[a-zA-Z.]+)$/,
    "num": /^(?:[0-9]+)$/
};

//validates symbols
function check_s(symbol) {
    if(!reg.sym.exec(symbol)) {
        $('#price').html("Plese fill a vald symbol");
        return 1;
    }
};

$(document).ready(function() {
    $('.img').fadeIn("slow");
    $('#form_quote').submit(function() {
        global.quote_symbol = $('#symbol').val();
        $('#get_quote').button('loading');
        $('#buy2').hide();
        $('#buy').hide();
        $('#funds').hide();
        $('#error1').hide();
        $('#button').hide();
        $('#load').fadeIn().css("display", "block");
        var check = check_s(global.quote_symbol);
        if(check === 1) {
            $('#get_quote').button('reset');
            $('#load').hide();
            return false;
        }
        global.quote_symbol = global.quote_symbol.toUpperCase();
        //getting quote
        $.ajax({
            url: "../model/quoteajax.php",
            data: {
                'symbol1': global.quote_symbol
            },
            success: function(data) {
                if(data.price1 !== "Error") {
                    $('#load').hide();
                    $('#get_quote').button('reset');
                    if(data.price1 != 0) {
                        var write = global.quote_symbol + ": " + data.price1 + "$ ";
                        $('#price').html(write);
                        $('#button').fadeIn();
                    }
                    else {
                        $('#price').html("Incorrect Symbol");
                    }
                }
                else {
                    $('#get_quote').button('reset');
                    $('#load').hide();
                    $('#price').html("error internet");
                }
            }
        });
        return false;
    });
    //unhides quantity
    $('#button').click(function() {
        $('#buy').fadeIn();
        $('#button').hide();
        $('#buy2').fadeIn();
        $('#funds').hide();
        $('#error1').hide();
        return false;
    });

    //buys shares
    $('#buy2').click(function () {
        var quantity = $('#quantity').val();
        //validation
        if(!reg.num.exec(quantity))
    {
        $('#warning_q').addClass("form-group has-error");
        $('#length').fadeIn();
        return false;
    }
        else {
            $('#warning_q').removeClass("form-group has-error");
            $('#length').hide();
        }	
    $('#load1').fadeIn().css("display", "block");
    $('#funds').hide();
    $('#error1').hide();
    //buys shares
    $.ajax({
        url: "../model/buyajax.php",
        data: {
            'symbol': global.quote_symbol,
        'quantity': quantity
        },
        success: function(data) {
            data = JSON.parse(data);
            if(data.info === "ok") {
                $('#load1').hide();
                $('#buy2').hide();
                $('#buy').hide();
                $('#funds').hide();
                $('#error1').hide();
                $('#button').fadeIn();
            }
            else if(data.info === "funds") {
                $('#load1').hide();
                $('#funds').fadeIn();
            }
            else {
                $('#load1').hide();
                $('#error1').fadeIn();
            }
        }
    });
    return false;
    });
});
