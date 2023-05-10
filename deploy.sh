echo '开始删除前端业务镜像和容器'

docker stop web_wizard_client

docker rm web_wizard_client

docker rmi web_wizard_client

echo '删除前端业务镜像和容器成功'

if [ "$1" = "base" ]; then

  echo '开始删除前端基础镜像'

  docker rmi web_wizard_client_base

  echo '删除基础镜像成功，开始构建前端基础镜像'

  docker build -f Dockerfile.base -t web_wizard_client_base .

  echo '前端基础镜像构建成功'

fi

echo '开始构建前端业务镜像'

docker build -t web_wizard_client .

echo '前端业务镜像构建成功'

echo '开始启动前端容器'

#HTTPS访问
# docker run -itd \
#   --restart=always \
#   --network=box_net \
#   -p 443:443 \
#   -v /home/kslab/ioc_platform/intelligence-admin/nginx.conf:/etc/nginx/nginx.conf \
#   -v /home/kslab/ioc_platform/intelligence-admin/server.pem:/etc/nginx/server.pem \
#   -v /home/kslab/ioc_platform/intelligence-admin/server-key.pem:/etc/nginx/server-key.pem \
#   --name=apt_threat_app \
#   apt_threat_app

# docker network create web_wizard_net

#HTTP访问
docker run -itd \
  --restart=always \
  --network=web_wizard_net \
  --name=web_wizard_client \
  -p 8000:80 \
  web_wizard_client
  # -v /home/kslab/ioc_platform/intelligence-admin/nginx.conf:/etc/nginx/nginx.conf \

echo '前端容器启动成功'