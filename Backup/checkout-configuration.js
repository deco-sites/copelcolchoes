const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    body: JSON.stringify({
        "paymentConfiguration": {
            "requiresAuthenticationForPreAuthorizedPaymentOption": false,
            "allowInstallmentsMerge": null,
            "blockPaymentSession": null,
            "paymentSystemToCheckFirstInstallment": "712",
            "defaultPaymentSystemToApplyOnUserOrderForm": null,
            "alwaysShowMarketplacePaymentSystems": false
        },
        "taxConfiguration": null,
        "minimumQuantityAccumulatedForItems": 1,
        "decimalDigitsPrecision": 2,
        "minimumValueAccumulated": 0,
        "apps": [
            {
                "fields": [
                    "orderIdMarketplace",
                    "paymentIdMarketplace",
                    "payment_method_id",
                    "payment_type",
                    "installments",
                    "authorization_code",
                    "first_six_digits",
                    "last_four_digits",
                    "currency_id",
                    "pack_id",
                    "shipment_id",
                    "mode",
                    "logistic_type",
                    "total_paid_amount",
                    "collector_id",
                    "marketplacePaymentMethod",
                    "me2_shipping_cost"
                ],
                "id": "marketplace-integration",
                "major": 1
            },
            {
                "fields": [
                    "collectorName",
                    "collectorDocumentId"
                ],
                "id": "marketplace-integration-b2w",
                "major": 1
            },
            {
                "fields": [
                    "collectorName",
                    "collectorDocumentId",
                    "marketplacePaymentMethod"
                ],
                "id": "cn-skyhub-integration",
                "major": 1
            },
            {
                "fields": [
                    "marketplacePaymentMethod"
                ],
                "id": "cn-magazineluiza-integration",
                "major": 1
            },
            {
                "fields": [
                    "marketplacePaymentMethod"
                ],
                "id": "cn-viavarejo-integration",
                "major": 1
            },
            {
                "fields": [
                    "marketplacePaymentMethod"
                ],
                "id": "cn-amazon-integration",
                "major": 1
            },
            {
                "fields": [
                    "marketplacePaymentMethod",
                    "marketplaceFreightPrice",
                    "marketplaceCreationDate",
                    "marketplaceEstimatedDeliveryDate"
                ],
                "id": "integration-marketplace-magazineluiza",
                "major": 1
            },
            {
                "fields": [
                    "marketplacePaymentMethod",
                    "marketplacePaymentsData",
                    "marketplaceCreationDate",
                    "marketplaceEstimatedDeliveryInfo"
                ],
                "id": "integration-marketplace-viavarejo",
                "major": 1
            },
            {
                "fields": [
                    "collectorName",
                    "collectorDocumentId",
                    "marketplacePaymentMethod",
                    "deliveryContractType",
                    "shippingMethod",
                    "marketplaceCreationDate",
                    "marketplaceEstimatedDeliveryDate"
                ],
                "id": "integration-marketplace-skyhub",
                "major": 1
            },
            {
                "fields": [
                    "marketplacePaymentMethod"
                ],
                "id": "integration-marketplace-amazon",
                "major": 1
            },
            {
                "fields": [
                    "documentIntermediator",
                    "intermediateRegistrationId",
                    "documentPaymentInstitution",
                    "paymentMethod",
                    "method",
                    "status",
                    "value",
                    "installments",
                    "marketplaceId",
                    "gatewayFee",
                    "marketplaceFee",
                    "paymentDetail",
                    "orderDiscount"
                ],
                "id": "259060938.-payment-anymarket1",
                "major": 1
            },
            {
                "fields": [
                    "documentIntermediator",
                    "intermediateRegistrationId",
                    "documentPaymentInstitution",
                    "paymentMethod",
                    "method",
                    "status",
                    "value",
                    "installments",
                    "marketplaceId",
                    "gatewayFee",
                    "marketplaceFee",
                    "paymentDetail",
                    "orderDiscount"
                ],
                "id": "259060938.-payment-anymarket2",
                "major": 1
            },
            {
                "fields": [
                    "orderType",
                    "anymarketId",
                    "marketplaceNumber",
                    "marketplace",
                    "selectedShippingType",
                    "shippingCarrier",
                    "shippingCarrierType"
                ],
                "id": "259060938.-order-anymarket",
                "major": 1
            }
        ],
        "allowMultipleDeliveries": false,
        "allowManualPrice": null,
        "savePersonalDataAsOptIn": false,
        "maxNumberOfWhiteLabelSellers": null,
        "recaptchaValidation": "always",
        "recaptchaMinScore": null,
        "recaptchaKeys": null,
        "maskStateOnAddress": null,
        "useOwnershipCookie": null,
        "ignoreProfileData": null,
        "useIndividualShippingEstimates": false
    }),
};

fetch("/api/checkout/pvt/configuration/orderForm", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));