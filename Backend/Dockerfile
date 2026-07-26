FROM eclipse-temurin:24-jdk

RUN apt-get update \
    && apt-get install -y ant \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

RUN ant clean
RUN ant

CMD ["java", "-cp", "build/classes:lib/mysql-connector-java.jar:Jar/jcalendar-tz-1.3.3-4.jar:Jar/rs2xml.jar", "university.management.system.api.ApiServer"]