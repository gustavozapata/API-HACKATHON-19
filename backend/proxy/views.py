import plaid
from plaid import errors as plaid_errors
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from account.models import PlaidItem, CustomUser
from core import settings

client = plaid.Client(client_id=settings.PLAID_CLIENT_ID, secret=settings.PLAID_SECRET,
                      public_key=settings.PLAID_PUBLIC_KEY, environment=settings.PLAID_ENV, api_version='2019-05-29')


@api_view(['POST'])
def get_access_token(request):
    public_token = request.data.get('public_token')
    try:
        exchange_response = client.Item.public_token.exchange(public_token)
    except plaid_errors.PlaidError as e:
        response_dict = {
            'error': e.message,
        }
        if e.type == 'INVALID_INPUT':
            response_dict.update(status=status.HTTP_401_UNAUTHORIZED)
        else:
            response_dict.update(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(response_dict)
    if isinstance(request.user, CustomUser):
        access_token = exchange_response['access_token']
        request.user.plaid_access_token = access_token
        item = PlaidItem.objects.get_or_create(user=request.user)
        item.item_id = exchange_response['item_id']
        return Response(exchange_response, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def get_auth(request):
    access_token = request.user.plaid_access_token
    try:
        auth_response = client.Auth.get(access_token)
    except plaid_errors.PlaidError as e:
        response_dict = {
            'error': e.message
        }
        if e.type == 'INVALID_INPUT':
            response_dict.update(status=status.HTTP_401_UNAUTHORIZED)
        else:
            response_dict.update(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({
            'auth': auth_response
        })

#
# # Retrieve ACH or ETF account numbers for an Item
# # https://plaid.com/docs/#auth
# @app.route('/auth', methods=['GET'])
# def get_auth():
#   try:
#     auth_response = client.Auth.get(access_token)
#   except plaid.errors.PlaidError as e:
#     return jsonify({'error': {'display_message': e.display_message, 'error_code': e.code, 'error_type': e.type } })
#   pretty_print_response(auth_response)
#   return jsonify({'error': None, 'auth': auth_response})
#
# # Retrieve Transactions for an Item
# # https://plaid.com/docs/#transactions
# @app.route('/transactions', methods=['GET'])
# def get_transactions():
#   # Pull transactions for the last 30 days
#   start_date = '{:%Y-%m-%d}'.format(datetime.datetime.now() + datetime.timedelta(-30))
#   end_date = '{:%Y-%m-%d}'.format(datetime.datetime.now())
#   try:
#     transactions_response = client.Transactions.get(access_token, start_date, end_date)
#   except plaid.errors.PlaidError as e:
#     return jsonify(format_error(e))
#   pretty_print_response(transactions_response)
#   return jsonify({'error': None, 'transactions': transactions_response})
#
# # Retrieve Identity data for an Item
# # https://plaid.com/docs/#identity
# @app.route('/identity', methods=['GET'])
# def get_identity():
#   try:
#     identity_response = client.Identity.get(access_token)
#   except plaid.errors.PlaidError as e:
#     return jsonify({'error': {'display_message': e.display_message, 'error_code': e.code, 'error_type': e.type } })
#   pretty_print_response(identity_response)
#   return jsonify({'error': None, 'identity': identity_response})
#
# # Retrieve real-time balance data for each of an Item's accounts
# # https://plaid.com/docs/#balance
# @app.route('/balance', methods=['GET'])
# def get_balance():
#   try:
#     balance_response = client.Accounts.balance.get(access_token)
#   except plaid.errors.PlaidError as e:
#     return jsonify({'error': {'display_message': e.display_message, 'error_code': e.code, 'error_type': e.type } })
#   pretty_print_response(balance_response)
#   return jsonify({'error': None, 'balance': balance_response})
#
# # Retrieve an Item's accounts
# # https://plaid.com/docs/#accounts
# @app.route('/accounts', methods=['GET'])
# def get_accounts():
#   try:
#     accounts_response = client.Accounts.get(access_token)
#   except plaid.errors.PlaidError as e:
#     return jsonify({'error': {'display_message': e.display_message, 'error_code': e.code, 'error_type': e.type } })
#   pretty_print_response(accounts_response)
#   return jsonify({'error': None, 'accounts': accounts_response})
#
# # Create and then retrieve an Asset Report for one or more Items. Note that an
# # Asset Report can contain up to 100 items, but for simplicity we're only
# # including one Item here.
# # https://plaid.com/docs/#assets
# @app.route('/assets', methods=['GET'])
# def get_assets():
#   try:
#     asset_report_create_response = client.AssetReport.create([access_token], 10)
#   except plaid.errors.PlaidError as e:
#     return jsonify({'error': {'display_message': e.display_message, 'error_code': e.code, 'error_type': e.type } })
#   pretty_print_response(asset_report_create_response)
#
#   asset_report_token = asset_report_create_response['asset_report_token']
#
#   # Poll for the completion of the Asset Report.
#   num_retries_remaining = 20
#   asset_report_json = None
#   while num_retries_remaining > 0:
#     try:
#       asset_report_get_response = client.AssetReport.get(asset_report_token)
#       asset_report_json = asset_report_get_response['report']
#       break
#     except plaid.errors.PlaidError as e:
#       if e.code == 'PRODUCT_NOT_READY':
#         num_retries_remaining -= 1
#         time.sleep(1)
#         continue
#       return jsonify({'error': {'display_message': e.display_message, 'error_code': e.code, 'error_type': e.type } })
#
#   if asset_report_json == None:
#     return jsonify({'error': {'display_message': 'Timed out when polling for Asset Report', 'error_code': e.code, 'error_type': e.type } })
#
#   asset_report_pdf = None
#   try:
#     asset_report_pdf = client.AssetReport.get_pdf(asset_report_token)
#   except plaid.errors.PlaidError as e:
#     return jsonify({'error': {'display_message': e.display_message, 'error_code': e.code, 'error_type': e.type } })
#
#   return jsonify({
#     'error': None,
#     'json': asset_report_json,
#     'pdf': base64.b64encode(asset_report_pdf),
#   })
#
# # Retrieve investment holdings data for an Item
# # https://plaid.com/docs/#investments
# @app.route('/holdings', methods=['GET'])
# def get_holdings():
#   try:
#     holdings_response = client.Holdings.get(access_token)
#   except plaid.errors.PlaidError as e:
#     return jsonify({'error': {'display_message': e.display_message, 'error_code': e.code, 'error_type': e.type } })
#   pretty_print_response(holdings_response)
#   return jsonify({'error': None, 'holdings': holdings_response})
#
# # Retrieve Investment Transactions for an Item
# # https://plaid.com/docs/#investments
# @app.route('/investment_transactions', methods=['GET'])
# def get_investment_transactions():
#   # Pull transactions for the last 30 days
#   start_date = '{:%Y-%m-%d}'.format(datetime.datetime.now() + datetime.timedelta(-30))
#   end_date = '{:%Y-%m-%d}'.format(datetime.datetime.now())
#   try:
#     investment_transactions_response = client.InvestmentTransactions.get(access_token,
#                                                                          start_date,
#                                                                          end_date)
#   except plaid.errors.PlaidError as e:
#     return jsonify(format_error(e))
#   pretty_print_response(investment_transactions_response)
#   return jsonify({'error': None, 'investment_transactions': investment_transactions_response})
#
# # Retrieve high-level information about an Item
# # https://plaid.com/docs/#retrieve-item
# @app.route('/item', methods=['GET'])
# def item():
#   global access_token
#   item_response = client.Item.get(access_token)
#   institution_response = client.Institutions.get_by_id(item_response['item']['institution_id'])
#   pretty_print_response(item_response)
#   pretty_print_response(institution_response)
#   return jsonify({'error': None, 'item': item_response['item'], 'institution': institution_response['institution']})
#
# @app.route('/set_access_token', methods=['POST'])
# def set_access_token():
#   global access_token
#   access_token = request.form['access_token']
#   item = client.Item.get(access_token)
#   return jsonify({'error': None, 'item_id': item['item']['item_id']})
#
# def pretty_print_response(response):
#   print(json.dumps(response, indent=2, sort_keys=True))
#
# def format_error(e):
#   return {'error': {'display_message': e.display_message, 'error_code': e.code, 'error_type': e.type, 'error_message': e.message } }
#
# if __name__ == '__main__':
#     app.run(port=os.getenv('PORT', 5000))
