from django.contrib import admin
from api.models import User, Profile, ChatMessage

# Register your models here.

class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email']

class ProfileAdmin(admin.ModelAdmin):
    list_editable = ['verified']
    list_display = ['user', 'full_name', 'verified']

class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ['sender', 'receiver', 'message']

admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(ChatMessage, ChatMessageAdmin)