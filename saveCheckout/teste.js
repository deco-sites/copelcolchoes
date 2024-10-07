$(document).ready(function () {
    if (window.location.hostname === 'sites-copelcolchoes--feat-11045.decocdn.com') {
        // Verifica se existe algum link com 'checkout6-custom.css'
        if ($('link[href*="checkout6-custom.css"]').length) {
            $('link[href*="checkout6-custom.css"]').remove();
        }

        // Adiciona o novo CSS no final do <body>
        $('body').append('<link href="/arquivos/checkout-homolog.css?v=9" rel="stylesheet" type="text/css">');
    }
});

$(document).ready(function () {
    if ($('body').hasClass('prod--ohboy-myvtex-com')) {
        $('link[href*="checkout6-custom.css"]').remove()
        $('body').append('<link href="/arquivos/checkout-homolog.css?v=9" rel="stylesheet" type="text/css">')
    }
});


// <div id="header">

//     <div class="wrapper">
//         <h1 class="Logo"><a href="/">Copel</a></h1>
//         <span class="selo-seguro teste"></span>
//     </div>
// </div>

// <div id="headerTeste">

//     <div class="wrapper">
//         <h1 class="Logo"><a href="/">Copel</a></h1>
//         <span class="selo-seguro teste"></span>
//     </div>
// </div>
<style>

</style>

$(document).ready(function () {
    if (window.location.hostname === 'sites-copelcolchoes--feat-11045.decocdn.com') {
        // Verifica se existe algum link com 'checkout6-custom.css'
        $('#header').addClass('n1-header');
        $('#footer-smart-checkout').addClass('n1-footer');
        $('body').addClass('n1-checkout');
        $('content-footer-smart-checkout').remove();

        if ($('#header').length) {
            // Remove o conteúdo interno de #header e adiciona o novo conteúdo
            $('#header').html(`
                <div id="headerN1" class="n1-header-checkout">
                    <div class="n1-checkout-wrapper">

                        <a class="n1-header-logo-copel">
                            <img src="/arquivos/header_logo_copel.svg" href="/" />
                        </a>
                        <div class="n1-header-selo">
                            <img src="/arquivos/icon_security.svg"/>
                            <p>Loja 100% Segura</p>
                        </div>
                    </div>
                </div>
            `);
        }

        if ($('#footer-smart-checkout').length) {

            // Remove o conteúdo interno de #footer-smart-checkout e adiciona o novo conteúdo
            $('#footer-smart-checkout').html(`
                <div id="n1-footer-checkout-copel" class="n1-footer-checkout n1-checkout-wrapper">
                    <div class="n1-footer-container-checkout-copel">

                        <div class="n1-footer-subcontainer pagamento">
                            <div class="n1-footer-title-checkout">
                                <p>Formas de Pagamento</p>
                            </div>

                            <div class="n1-footer-selos">
                                <img src="/arquivos/footer_icon_visa.svg" /> 
                                <img src="/arquivos/footer_icon_mastercard.svg" /> 
                                <img src="/arquivos/footer_icon_hipercard.svg" /> 
                                <img src="/arquivos/footer_icon_hipercard.svg" /> 
                                <img src="/arquivos/footer_icon_dinners.svg" /> 
                                <img src="/arquivos/footer_logo_elo.svg" /> 
                                <img src="/arquivos/footer_icon_boleto.svg" /> 
                            </div>
                        </div>
                        <div class="n1-footer-subcontainer selos">
                            <div class="n1-footer-title-checkout">
                                <p>Selos e Segurança</p>
                            </div>

                            <div class="n1-footer-selos">
                                 <img src="/arquivos/icon_certificado_cacf.svg" />
                                 <img src="/arquivos/icon_ebit.svg" />
                            </div>
                        </div>
                        <div class="n1-footer-subcontainer desenvolvido">
                            <div class="n1-footer-title-checkout">
                                <p>Desenvolvido</p>
                            </div>

                            <div class="n1-footer-logos">
                                <img src="/arquivos/footer_logo_n1.svg" />
                                <img src="/arquivos/footer_icone_vtex.svg" />
                            </div>
                        </div>

                    </div>
                    <div class="n1-footer-text-copyright">
                        <p>
                            Copyright © Copel Colchões 2010 - Todos os direitos reservados. REDE CONFORTO COMERCIAL DE COLCHÕES LTDA CNPJ: 61.522.850/0112-60 Rodovia Vice Prefeito Hermenegildo Tonolli, 3049 - São Roque da Chave São Paulo-SP 13295-000 - Tel.: (11) 3995-3950 - atendimento@copelcolchoes.com.br
                        </p>
                    </div>
                </div>
            `);
        }
    }
});



@import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css);@import url(http://fonts.googleapis.com/css?family=Oswald:400,300);body,html{height:100%;box-sizing:content-box}.container{min-height:calc(100% - 351px)}body a{color:#002b62}h1{font-family:comfortaabold;color:#666}@font-face{font-family:comfortaabold;src:url(https://copelcolchoes.vteximg.com.br/arquivos/comfortaa-bold-webfont.eot.css);src:url(https://copelcolchoes.vteximg.com.br/arquivos/comfortaa-bold-webfont.eot.css?#iefix) format("embedded-opentype"),url(https://copelcolchoes.vteximg.com.br/arquivos/comfortaa-bold-webfont.woff.css) format("woff"),url(https://copelcolchoes.vteximg.com.br/arquivos/comfortaa-bold-webfont.ttf.css) format("truetype"),url(https://copelcolchoes.vteximg.com.br/arquivos/comfortaa-bold-webfont.svg.css#comfortaabold) format("svg");font-weight:400;font-style:normal}@font-face{font-family:comfortaalight;src:url(https://copelcolchoes.vteximg.com.br/arquivos/comfortaa-light-webfont.eot.css);src:url(https://copelcolchoes.vteximg.com.br/arquivos/comfortaa-light-webfont.eot.css?#iefix) format("embedded-opentype"),url(https://copelcolchoes.vteximg.com.br/arquivos/comfortaa-light-webfont.woff.css) format("woff"),url(https://copelcolchoes.vteximg.com.br/arquivos/comfortaa-light-webfont.ttf.css) format("truetype"),url(https://copelcolchoes.vteximg.com.br/arquivos/comfortaa-light-webfont.svg.css#comfortaalight) format("svg");font-weight:400;font-style:normal}@font-face{font-family:comfortaaregular;src:url(https://copelcolchoes.vteximg.com.br/arquivos/comfortaa-regular-webfont.eot.css);src:url(https://copelcolchoes.vteximg.com.br/arquivos/comfortaa-regular-webfont.eot.css?#iefix) format("embedded-opentype"),url(https://copelcolchoes.vteximg.com.br/arquivos/comfortaa-regular-webfont.woff.css) format("woff"),url(https://copelcolchoes.vteximg.com.br/arquivos/comfortaa-regular-webfont.ttf.css) format("truetype"),url(https://copelcolchoes.vteximg.com.br/arquivos/comfortaa-regular-webfont.svg.css#comfortaaregular) format("svg");font-weight:400;font-style:normal}@font-face{font-family:lao_uiregular;src:url(https://copelcolchoes.vteximg.com.br/arquivos/laoui-webfont.eot.css);src:url(https://copelcolchoes.vteximg.com.br/arquivos/laoui-webfont.eot.css?#iefix) format("embedded-opentype"),url(https://copelcolchoes.vteximg.com.br/arquivos/laoui-webfont.woff.css) format("woff"),url(https://copelcolchoes.vteximg.com.br/arquivos/laoui-webfont.ttf.css) format("truetype"),url(https://copelcolchoes.vteximg.com.br/arquivos/laoui-webfont.svg.css#lao_uiregular) format("svg");font-weight:400;font-style:normal}@font-face{font-family:lao_uibold;src:url(https://copelcolchoes.vteximg.com.br/arquivos/laouib-webfont.eot.css);src:url(https://copelcolchoes.vteximg.com.br/arquivos/laouib-webfont.eot.css?#iefix) format("embedded-opentype"),url(https://copelcolchoes.vteximg.com.br/arquivos/laouib-webfont.woff.css) format("woff"),url(https://copelcolchoes.vteximg.com.br/arquivos/laouib-webfont.ttf.css) format("truetype"),url(https://copelcolchoes.vteximg.com.br/arquivos/laouib-webfont.svg.css#lao_uibold) format("svg");font-weight:400;font-style:normal}@media (min-width: 1200px){.buy-button,.nav>.pull-right{float:right}.container{width:1170px}.container-cart,.container-order-form{width:970px}.masthead{padding:10px 5px 0}.masthead h3{font-size:24.5px;margin:10px 0}.masthead h1,.masthead h2,.masthead h3{line-height:40px}.masthead h1,.masthead h2,.masthead h3,.masthead h4,.masthead h5,.masthead h6{font-family:Oswald, sans-serif;font-weight:300}#footerCredits{background-color:#F5F5F5;padding:60px 10px}#footerCredits img{display:inline-block;margin-bottom:40px}.nav>li>a,.valor-por,nav{display:block}h1.lead{margin-top:0}.valor-por{font-size:36px;margin-top:4px;line-height:140%}.descricao-preco{margin-top:10px}.buy-button{width:30%;font-weight:700}.nav{margin-bottom:20px;margin-left:0;list-style:none}.nav>li>a{font-size:14px}.locale{display:none}.product-name .brand-name,.product-name .seller{display:none}.nav>li>a:hover{text-decoration:none;background-color:#eee}.nav>li>a>img{max-width:none}.nav-pills>li,.nav-tabs>li{float:left}.nav-pills>li>a,.nav-tabs>li>a{padding-right:12px;padding-left:12px;margin-right:2px;line-height:14px}.nav-pills>li>a{padding-top:8px;padding-bottom:8px;margin-top:2px;margin-bottom:2px;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px}.steps-view{width:422px}.mini-cart{text-shadow:0 1px 0 #fff;position:relative}.mini-cart .summary-template-holder,.mini-cart h2{background:#f7f7f7;border-bottom-left-radius:5px;border-bottom-right-radius:5px;border-top:1px dotted #eee;padding-top:8px}.mini-cart .cart-template-holder{background:#fff;border-right:3px solid #F7F7F7;border-left:3px solid #F7F7F7}.mini-cart h2{font-size:14px;font-weight:700;margin-top:0;padding:4px 6px;text-align:right;color:#aaa;margin-bottom:0;border-radius:5px 5px 0 0}.mini-cart .cart{margin-bottom:0;padding:1px 3px 6px 5px}.mini-cart .monetary,.mini-cart .quantity-price{text-align:right;white-space:nowrap}.mini-cart .cart table tbody tr td.quantity-price{float:right;margin-right:6px}.mini-cart .info{text-align:right;width:58%;padding-top:6px}.mini-cart .monetary{padding-top:6px}.mini-cart .table tfoot td{color:#468847;font-size:13px;font-weight:700;padding-top:12px}.mini-cart .product-item{padding-bottom:6px}.mini-cart .product-item .quantity-price,.mini-cart .product-item .shipping-date{font-size:11px;padding:10px 0 4px}.mini-cart .totalizers{margin-bottom:10px}.mini-cart .link-cart{font-size:11px;margin-top:5px}}.body-order-placed .selo-Ebit{margin:40px auto 20px;width:468px;display:block !important}@media (max-width: 480px){#header button.back{background-color:transparent;float:left;margin:10px;color:#fff;border:0;font-size:17px;line-height:24px;font-weight:400;padding:0}#header button.back .arrow{width:17px;height:23px;background-image:url(/arquivos/playkids-mobile-sprite.png);background-size:320px auto;background-repeat:no-repeat;background-position:-177px -60px;float:left}}#header{overflow:hidden;clear:both;padding-top:30px}.wrapper{width:90%;max-width:940px;padding:0 20px;margin:0 auto;position:relative}.Logo{float:left}.Logo a{background:url(/arquivos/logo.png?v=635175432440430000);width:180px;height:90px;display:block;font-size:0}.selo-seguro{background:url(/arquivos/selo-seguro.png);width:100px;height:45px;display:block;float:right;margin:40px 0}@media screen and (max-width: 440px){.Logo a{font-size:0;background:url(/arquivos/logo-copel-mobile.png) no-repeat;background-size:contain;width:105px;height:54px;display:block}.selo-seguro{margin:20px 0}}#footer-smart-checkout,.left-footer-smart-checkout,.right-footer-smart-checkout{background:#f4f4f4}.content-footer-smart-checkout{margin:0 auto;width:960px;padding:10px 0;box-sizing:content-box}#footer-smart-checkout{margin:0 auto;width:100%;height:130px;border-top:1px #ccc solid}.left-footer-smart-checkout{float:left;color:#9a9a9a;font-size:12px}.right-footer-smart-checkout{float:right;padding:15px 0 10px}.text-footer{color:#891D1D;font-size:14px}.alert.alert-correios{width:750px;display:none}.body-cart .alert.alert-correios{display:block}#clock,#container-countdown ul li{vertical-align:middle;display:inline-block}.alert-correios p{vertical-align:middle;display:inline-block}.alert-correios .fa.fa-exclamation-triangle{font-size:29px;vertical-align:middle}.alert-correios p{width:90%;padding-left:15px;text-align:justify}@media screen and (max-width: 550px){.alert-correios p{width:80%}}#container-countdown{float:left;width:100%;margin:0 auto}#container-countdown ul{margin:0 auto;width:350px;padding:0}#countdown{width:145px;height:30px;background-color:#000}#clock{font-size:22px;font-family:arial;font-weight:700;color:#FFC800;padding:5px}.show-boleto{overflow-y:hidden}.boleto-modal{background:rgba(0,0,0,0.63);width:100%;height:100vh;display:block;position:fixed;top:0}.boleto-modal__body{position:fixed;z-index:999999999;top:15%;left:23%;width:745px;height:500px;background:#fff;padding:15px}.boleto-modal__fechar{position:absolute;right:-10px;top:-10px;background:#002b62;width:40px;height:40px;border-radius:50%;text-align:center;font-size:25px;line-height:40px;color:#fff;cursor:pointer}.boleto-modal__iframe{width:100%;height:100%}@media screen and (max-width: 550px){#container-countdown ul{width:200px}#container-countdown ul li{display:block;text-align:center}#countdown{margin:0 auto;width:135px;height:30px}#clock{font-size:18px;font-family:arial}}.add-service-container a{background:#253271;color:#fff;padding:7px 20px;clear:both;margin-top:15px;font-size:12px;border-radius:7px;border:0}.add-service-container a:hover{background:#212d65;color:#fff}body{overflow-x:hidden}#footer-smart-checkout{height:auto}#footer-smart-checkout .container{max-width:976px}.box.formpag{width:100%;margin-bottom:12px}.box.formpag h2{font-size:1em}.box.formpag span{background:url(/arquivos/formpag.png) no-repeat;background-size:300px;width:300px;height:31px;display:block}.content-footer-smart-checkout:not(.text-footer){display:flex !important;max-width:976px;margin:auto;justify-content:space-between;align-items:center}.left-footer-smart-checkout{font-size:.8em;padding-right:12px}@media screen and (max-width: 992px){.body-cart{padding:0 0 70px}.container.container-main.container-cart{padding:0 20px !important}.content-footer-smart-checkout.text-footer{display:block !important;width:100%;text-align:center}.box.formpag span{background-size:240px;width:240px}#footer-smart-checkout{padding:0 20px}.right-footer-smart-checkout img{max-width:260px}#footer-smart-checkout .content-footer-smart-checkout{flex-flow:column nowrap;align-items:flex-start}}#payment-group-payMeePaymentGroup span{font-size:0;background-image:url(/arquivos/paymee-arrows.png) !important}#payment-group-payMeePaymentGroup span:after{font-size:12px;content:"Transf. Bancária"}
/*# sourceMappingURL=checkout5-custom.css.map */


@import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css");body{border-top:5px solid #002b62}body a{color:#002b62}h1{font-family:'comfortaabold';color:#666}@font-face{font-family:'comfortaabold';src:url("https://copelcolchoes.vteximg.com.br/arquivos/comfortaa-bold-webfont.eot.css");src:url("https://copelcolchoes.vteximg.com.br/arquivos/comfortaa-bold-webfont.eot.css?#iefix") format("embedded-opentype"),url("https://copelcolchoes.vteximg.com.br/arquivos/comfortaa-bold-webfont.woff.css") format("woff"),url("https://copelcolchoes.vteximg.com.br/arquivos/comfortaa-bold-webfont.ttf.css") format("truetype"),url("https://copelcolchoes.vteximg.com.br/arquivos/comfortaa-bold-webfont.svg.css#comfortaabold") format("svg");font-weight:normal;font-style:normal}@font-face{font-family:'comfortaalight';src:url("https://copelcolchoes.vteximg.com.br/arquivos/comfortaa-light-webfont.eot.css");src:url("https://copelcolchoes.vteximg.com.br/arquivos/comfortaa-light-webfont.eot.css?#iefix") format("embedded-opentype"),url("https://copelcolchoes.vteximg.com.br/arquivos/comfortaa-light-webfont.woff.css") format("woff"),url("https://copelcolchoes.vteximg.com.br/arquivos/comfortaa-light-webfont.ttf.css") format("truetype"),url("https://copelcolchoes.vteximg.com.br/arquivos/comfortaa-light-webfont.svg.css#comfortaalight") format("svg");font-weight:normal;font-style:normal}@font-face{font-family:'comfortaaregular';src:url("https://copelcolchoes.vteximg.com.br/arquivos/comfortaa-regular-webfont.eot.css");src:url("https://copelcolchoes.vteximg.com.br/arquivos/comfortaa-regular-webfont.eot.css?#iefix") format("embedded-opentype"),url("https://copelcolchoes.vteximg.com.br/arquivos/comfortaa-regular-webfont.woff.css") format("woff"),url("https://copelcolchoes.vteximg.com.br/arquivos/comfortaa-regular-webfont.ttf.css") format("truetype"),url("https://copelcolchoes.vteximg.com.br/arquivos/comfortaa-regular-webfont.svg.css#comfortaaregular") format("svg");font-weight:normal;font-style:normal}@font-face{font-family:'lao_uiregular';src:url("https://copelcolchoes.vteximg.com.br/arquivos/laoui-webfont.eot.css");src:url("https://copelcolchoes.vteximg.com.br/arquivos/laoui-webfont.eot.css?#iefix") format("embedded-opentype"),url("https://copelcolchoes.vteximg.com.br/arquivos/laoui-webfont.woff.css") format("woff"),url("https://copelcolchoes.vteximg.com.br/arquivos/laoui-webfont.ttf.css") format("truetype"),url("https://copelcolchoes.vteximg.com.br/arquivos/laoui-webfont.svg.css#lao_uiregular") format("svg");font-weight:normal;font-style:normal}@font-face{font-family:'lao_uibold';src:url("https://copelcolchoes.vteximg.com.br/arquivos/laouib-webfont.eot.css");src:url("https://copelcolchoes.vteximg.com.br/arquivos/laouib-webfont.eot.css?#iefix") format("embedded-opentype"),url("https://copelcolchoes.vteximg.com.br/arquivos/laouib-webfont.woff.css") format("woff"),url("https://copelcolchoes.vteximg.com.br/arquivos/laouib-webfont.ttf.css") format("truetype"),url("https://copelcolchoes.vteximg.com.br/arquivos/laouib-webfont.svg.css#lao_uibold") format("svg");font-weight:normal;font-style:normal}@media (min-width: 1200px){@import "http://fonts.googleapis.com/css?family=Oswald:400,300";body{}.container{width:1170px}.container-cart,.container-order-form{width:970px}.masthead{padding:10px 5px 0}.masthead h3{font-size:24.5px;margin:10px 0}.masthead h1,.masthead h2,.masthead h3{line-height:40px}.masthead h1,.masthead h2,.masthead h3,.masthead h4,.masthead h5,.masthead h6{font-family:'Oswald', sans-serif;font-weight:300}#footerCredits{background-color:#F5F5F5;padding:60px 10px}#footerCredits img{display:inline-block;margin-bottom:40px}h1.lead{margin-top:0}.valor-por{font-size:36px;margin-top:4px;display:block;line-height:140%}.descricao-preco{margin-top:10px}.buy-button{float:right;width:30%;font-weight:bold}nav{display:block}.nav{margin-bottom:20px;margin-left:0;list-style:none}.nav>li>a{display:block;font-size:14px}.nav>li>a:hover{text-decoration:none;background-color:#eeeeee}.nav>li>a>img{max-width:none}.nav>.pull-right{float:right}.nav-tabs>li,.nav-pills>li{float:left}.nav-tabs>li>a,.nav-pills>li>a{padding-right:12px;padding-left:12px;margin-right:2px;line-height:14px}.nav-pills>li>a{padding-top:8px;padding-bottom:8px;margin-top:2px;margin-bottom:2px;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px}.product-name .brand-name,.product-name .seller{display:none}.steps-view{width:422px}.mini-cart{text-shadow:0 1px 0px #fff;position:relative}.mini-cart .summary-template-holder,.mini-cart h2{background:#f7f7f7;border-bottom-left-radius:5px;border-bottom-right-radius:5px;border-top:1px dotted #eee;padding-top:8px}.mini-cart .cart-template-holder{background:#fff;border-right:3px solid #F7F7F7;border-left:3px solid #F7F7F7}.mini-cart h2{font-size:14px;font-weight:bold;margin-top:0;padding:4px 6px;text-align:right;color:#aaa;margin-bottom:0;border-radius:0;border-top-left-radius:5px;border-top-right-radius:5px}.mini-cart .cart{margin-bottom:0;padding:1px 3px 6px 5px}.mini-cart .monetary,.mini-cart .quantity-price{text-align:right;white-space:nowrap}.mini-cart .cart table tbody tr td.quantity-price{float:right;margin-right:6px}.mini-cart .info{text-align:right;width:58%}.mini-cart .info,.mini-cart .monetary{padding-top:6px}.mini-cart .table tfoot td{color:#468847;font-size:13px;font-weight:bold;padding-top:12px}.mini-cart .product-item{padding-bottom:6px}.mini-cart .product-item .shipping-date,.mini-cart .product-item .quantity-price{font-size:11px;padding:10px 0 4px 0}.mini-cart .totalizers{margin-bottom:10px}.mini-cart .link-cart{font-size:11px;margin-top:5px}.locale{display:none}}.body-order-placed .selo-Ebit{margin:20px auto;width:468px;display:block !important;margin-top:40px}@media (max-width: 480px){#header button.back{background-color:transparent;border:none;float:left;margin:10px;color:#fff;border:0;font-size:17px;line-height:24px;font-weight:normal;padding:0}#header button.back .arrow{width:17px;height:23px;background-image:url("/arquivos/playkids-mobile-sprite.png");background-size:320px auto;background-repeat:no-repeat;background-position:-177px -60px;float:left}}#header{overflow:hidden;clear:both}.wrapper{width:90%;max-width:940px;padding:0 20px;margin:0 auto;position:relative}.Logo{float:left}.Logo a{background:url(/arquivos/logo.png?v=635175432440430000);width:180px;height:90px;display:block;font-size:0}.selo-seguro{background:url(/arquivos/selo-seguro.png);width:100px;height:45px;display:block;float:right;margin:40px 0}@media screen and (max-width: 440px){.Logo a{font-size:0;background:url("/arquivos/logo-copel-mobile.png") no-repeat;background-size:contain;width:105px;height:54px;display:block}.selo-seguro{margin:20px 0}}#footer-smart-checkout,#left-footer-smart-checkout,#right-footer-smart-checkout,#content-footer-smart-checkout{background:#f4f4f4}#content-footer-smart-checkout{margin:0 auto;width:960px;padding:10px 0 10px 0}#footer-smart-checkout{margin:0 auto;width:100%;height:130px;border-top:1px #ccc solid}#left-footer-smart-checkout{float:left;color:#9a9a9a;font-size:12px}#right-footer-smart-checkout{float:right;padding:15px 0 10px 0}@media screen and (max-width: 522px){ul.nav.nav-pills{display:flex;flex-direction:column}}.alert.alert-correios{width:750px;display:none}.body-cart .alert.alert-correios{display:block}.alert-correios .fa.fa-exclamation-triangle{font-size:29px;vertical-align:middle}.alert-correios p{display:inline-block;vertical-align:middle;width:90%;padding-left:15px;text-align:justify}@media screen and (max-width: 550px){.alert-correios p{width:80%}}.show-boleto{overflow-y:hidden}.boleto-modal{background:rgba(0,0,0,0.63);width:100%;height:100vh;display:block;position:fixed;top:0}.boleto-modal__body{position:fixed;z-index:999999999;top:15%;left:23%;width:745px;height:500px;background:#fff;padding:15px}.boleto-modal__fechar{position:absolute;right:-10px;top:-10px;background:#002b62;width:40px;height:40px;border-radius:50%;text-align:center;font-size:25px;line-height:40px;color:#fff;cursor:pointer}.boleto-modal__iframe{width:100%;height:100%}.add-service-container a{background:#253271;color:#fff;padding:7px 20px;clear:both;margin-top:15px;font-size:12px;border-radius:7px;border:0}.add-service-container a:hover{background:#212d65;color:#fff}div#ajaxBusy{display:none}
/*# sourceMappingURL=checkout-custom.css.map */
