////////////////////////////////////////////////////////////
// MEMBERS.js
//
// database access methods for the members table
////////////////////////////////////////////////////////////

var knex = require('../../config/db/knex');
var firstBy = require('thenby');

// PUBLIC methods

// create a new member using the stripe info - return the member object
exports.createMemberStripe = function (
  stripeuserid, stripepublishkey, stripeaccesstoken, striperefreshtoken) {

  // console.log('*** createMemberStripe');
  return knex('members').insert({
    stripeuserid: stripeuserid,
    stripepublishkey: stripepublishkey,
    stripeaccesstoken: stripeaccesstoken,
    striperefreshtoken: striperefreshtoken
  })
  .then(function(ins){
    return exports.getMember_ByStripeUserId(stripeuserid);
  });
};

// retrieve member row by stripe userid
exports.getMember_ByStripeUserId = function(stripeuserid){
  return knex('members').where({stripeuserid: stripeuserid}).first();
};

// retrieve all members
exports.getMembers = function(){
  return knex('members');
};

// retrieve member row by id
exports.getMember_ById = function(id){
  return knex('members').where({id: id}).first();
};

// update member approval
exports.updateMemberApproval_ByStripeUserId = function(stripeuserid, isApproved){

  return knex('members').update({
    wctapproved: isApproved,
    updated_at: knex.fn.now()
  }).where({stripeuserid:stripeuserid})
  .then(function(){
    return exports.getMember_ByStripeUserId(stripeuserid);
  });
};

// update a member by stripe id
exports.updateMemberStripe_ByStripeUserId = function (
  stripeuserid, stripepublishkey, stripeaccesstoken, striperefreshtoken) {

  return knex('members').update({
    stripepublishkey: stripepublishkey,
    stripeaccesstoken: stripeaccesstoken,
    striperefreshtoken: striperefreshtoken,
    updated_at: knex.fn.now()
  }).where({stripeuserid: stripeuserid}).then(function(_id){
    return exports.getMember_ByStripeUserId(stripeuserid);
  });
};

// update member account details
exports.updateMemberAccountInfo_ByStripeAccount = function(_account){

  return knex('members').update({
    businesslogo: _account.business_logo,
    businessname: _account.business_name,
    businessurl: _account.business_url,
    chargesenabled: _account.charges_enabled,
    country: _account.country,
    defaultcurrency: _account.default_currency,
    detailssubmitted: _account.details_submitted,
    displayname: _account.display_name,
    email: _account.email,
    managed: _account.managed,
    statementdescriptor: _account.statement_descriptor,
    supportemail: _account.support_email,
    supportphone: _account.support_phone,
    timezone: _account.timezone,
    transfersenabled: _account.transfers_enabled

  }).where({stripeuserid: _account.id}).then(function(){
    return exports.getMember_ByStripeUserId(_account.id);
  });
};


// delete a member by stripe userid
exports.deleteMember_ByStripeUserId = function(stripeuserid){
  return knex('members').where({stripeuserid:stripeuserid}).del();
};