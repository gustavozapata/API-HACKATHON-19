from django.contrib.auth import models as auth_models

from django.db import models


class CustomUser(auth_models.AbstractUser):
    plaid_access_token = models.TextField(null=True)


class PlaidItem(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='plaid_items')
    item_id = models.TextField(null=False)


