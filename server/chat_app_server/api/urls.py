from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from api import views

urlpatterns = [
    path("token/", views.MyTokenView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),
    path("register/", views.RegisterView.as_view()),
    path("dashboard/", views.dashboard),

    path("my-messages/<user_id>/", views.MyInbox.as_view()),
    path("get-messages/<sender_id>/<receiver_id>/", views.GetMessages.as_view()),
    path("send-messages/", views.SendMessages.as_view()),

    path("profile/<int:pk>", views.ProfileDetails.as_view()),
    path("search/<username>/", views.SearchUser.as_view())

]