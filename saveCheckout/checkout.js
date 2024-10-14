$(document).ready(function () {
    $('body').addClass('n1-checkout');

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

                <div id="n1-footer-checkout-copel" class="n1-footer n1-footer-checkout">
                    <div class="n1-checkout-wrapper">
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
                </div>
            `);
        }
    }
});
