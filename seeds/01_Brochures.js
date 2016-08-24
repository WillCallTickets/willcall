
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('brochures').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('brochures').insert({id: 1, title: 'Tickets on your terms', abstract: 'Avoid exorbitant hidden fees. Show your customers the <strong>ONE</strong> price they need to know. Simply include your service fees in an all-in pricing structure.', description: ''}),
        knex('brochures').insert({id: 2, title: 'Tier pricing', abstract: 'VIP? Special access? Group packages? Create custom ticket tiers and give your customers the power of selection.', description: ''}),
        knex('brochures').insert({id: 3, title: 'Upsell captive buyers', abstract: 'Allow customers to tack on your company\'s products. T-shirts, posters, camping and parking packages are just a few of the unlimited options you can offer to increase your sales.', description: ''}),
        knex('brochures').insert({id: 4, title: 'Process payments securely', abstract: 'We use <strong>Stripe</strong> to integrate seamless payments with Apple Pay, Amex Express Checkout, or Android Pay and more.', description: ''}),
        knex('brochures').insert({id: 5, title: 'Administrative console', abstract: 'Your data is <strong>your data</strong> and available 24/7. Manage your employees, their access and utilize powerful analytics to evaluate your sales. See your sales in real-time and in progress leading up to your event.', description: ''}),
        knex('brochures').insert({id: 6, title: 'Custom integration', abstract: 'Don\'t want to change your web presence? Simply include our button widgets and sell products directly from your existing website utilizing our backend and infrastructure.', description: ''}),

        knex.raw('ALTER SEQUENCE brochures_id_seq RESTART WITH 7;')
      ]);
    });
};