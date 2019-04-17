FROM openjdk:8-jre-alpine
WORKDIR /
ADD /build/libs/d3compare-0.0.1-SNAPSHOT.war d3compare.war
CMD java -jar d3compare.war