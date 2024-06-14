from django.shortcuts import render
from django.conf  import settings
import json
import os
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.core.files.storage import FileSystemStorage

from .models import UserPlaylist

# Load manifest when server launches
MANIFEST = {}
if not settings.DEBUG:
    f = open(f"{settings.BASE_DIR}/core/static/manifest.json")
    MANIFEST = json.load(f)

# Create your views here.
@login_required
def index(req):
    context = {
        "asset_url": os.environ.get("ASSET_URL", ""),
        "debug": settings.DEBUG,
        "manifest": MANIFEST,
        "js_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["file"],
        "css_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["css"][0]
    }
    return render(req, "core/index.html", context)

@login_required
def create_playlist(req):
    if req.method == 'POST':
        user_id = req.user
        title = req.POST.get('title')
        file = req.FILES.get('file')

        new_playlist = UserPlaylist.objects.create(
            user_id = user_id,
            title = title
        )
        new_playlist.save()

        # Create user directory if it doesn't exist
        user_dir = os.path.join(settings.MEDIA_ROOT, 'playlists', str(user_id))
        if not os.path.exists(user_dir):
            os.makedirs(user_dir)
            
        # Create playlist directory if it doesn't exist
        playlist_dir = os.path.join(user_dir, str(new_playlist.id))
        if not os.path.exists(playlist_dir):
            os.makedirs(playlist_dir)

        # Extract zip file
        fs = FileSystemStorage(location=playlist_dir)
        filename = fs.save(file.name, file)
        filepath = fs.path(filename)
        
        # Extract zip file contents to the playlist directory
        import zipfile
        with zipfile.ZipFile(filepath, 'r') as zip_ref:
            zip_ref.extractall(playlist_dir)

        return JsonResponse({"message": "Playlist created successfully"}, status=201)
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)