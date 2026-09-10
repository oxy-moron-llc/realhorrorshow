# realhorror.show

A responsive direct-to-consumer storefront for customizable cryptozoology, UFO, and oddities merchandise.

## Run locally

```bash
npm install
npm run dev
```

Set `VITE_CHECKOUT_URL` in a local `.env` file to a hosted Stripe Payment Link, Shopify checkout, or another secure checkout URL. Without it, the storefront stays in demo mode and explains what is missing when checkout is pressed.

## Fastest path to revenue

Launch with a print-on-demand supplier and no purchased inventory. Keep the initial catalog deliberately small:

| Product | Retail | Target fulfillment cost | Gross margin before fees/ads |
| --- | ---: | ---: | ---: |
| Printed tee | $32.00 | $13.25 | $18.75 (59%) |
| Custom plaque | $46.00 | $18.50 | $27.50 (60%) |
| Four-coaster set | $28.00 | $10.40 | $17.60 (63%) |
| Printed tote | $27.00 | $11.20 | $15.80 (59%) |

These are planning assumptions, not supplier quotes. Confirm base product, print, packaging, and shipping costs before publishing. Aim to keep gross product margin above 55%; charge shipping below the free-shipping threshold so fulfillment does not erase it.

### Recommended model

1. **Core evergreen range:** Mothman, Bigfoot, and UFO designs on four proven blanks.
2. **Personalization upsell:** Include one short text field in the base price initially. Once conversion data exists, test a $6–$10 premium.
3. **Monthly limited drop:** Sell a numbered regional cryptid design for seven days, then fulfill the batch. Scarcity is real and there is no dead stock.
4. **Bundles:** Pair a tee and coaster set at $54. This lifts average order value while retaining a healthy contribution margin.
5. **Email capture:** Add a “field report” launch list before spending on ads. Organic short-form videos showing customization and fulfillment should validate demand first.

## Gateway and fulfillment options

| Stack | Best use | Tradeoff |
| --- | --- | --- |
| Shopify + Printful/Printify | Fastest operational launch | Monthly platform and app costs; less control |
| Stripe Checkout + Printful API | Custom brand experience | Requires backend order creation and webhook handling |
| Fourthwall | Lowest operational overhead for creator-led sales | Less storefront and customer-data control |
| Etsy + POD integration | Marketplace demand validation | Listing/transaction fees and weaker customer ownership |

For the first paid orders, use Shopify with a POD app if speed matters most. Use Stripe Checkout only after adding a small server that verifies payments and submits orders to the fulfillment provider; never place secret API keys in this Vite frontend.

## Before accepting payments

- Replace the planning costs with current supplier quotes for every size and destination.
- Order samples and verify print contrast, plaque legibility, and packaging.
- Confirm commercial rights for every illustration and font.
- Add shipping, returns, privacy, terms, and personalization approval policies.
- Configure sales tax/VAT collection for the merchant's jurisdictions.
- Add analytics events for product view, customization, add-to-cart, and checkout.
- Use original folklore-inspired art; do not imply affiliation with living artists, films, television properties, or trademark owners.

Profit cannot be guaranteed immediately. This setup minimizes upfront cash risk and exposes gross margins, but actual profitability depends on conversion, returns, payment fees, shipping subsidies, and customer acquisition cost.