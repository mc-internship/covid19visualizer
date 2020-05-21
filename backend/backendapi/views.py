from __future__ import unicode_literals

from django.shortcuts import render

from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . models import Coviddata
from . models import RegionsHierarchy
from . serializers import CoviddataSerializer
from . serializers import RegionsHierarchySerializer
from . serializers import CoviddataSerializerfortimeseries
from django.core import serializers
import json
from django.core.serializers.json import DjangoJSONEncoder


class covidDataIndiaStatewise(APIView):


    def get(self,request, countryid):
        statesindia = RegionsHierarchy.objects.filter(superregionid = countryid)
        statesindiaserialize = RegionsHierarchySerializer(statesindia, many = True)
        statesindiadict = statesindiaserialize.data

        
        alist = []

        totaldata = Coviddata.objects.raw('''SELECT *
                                        FROM Coviddata
                                        WHERE date=(
                                        SELECT MAX(date) FROM Coviddata WHERE regionid=%s) AND regionid = %s''',[countryid,countryid])

        totalcovserialize = CoviddataSerializer(totaldata, many = True)
        totaldict = totalcovserialize.data
        for j in totaldict:
                j["state"] = "Total"
                j["statecode"] = "TT"
                j["statenotes"] = ""
                alist.append(j)


                
        for i in statesindiadict:
            regid = i['regionid']
            statename = i['regionname']
            covdata = Coviddata.objects.raw('''SELECT *
                                        FROM Coviddata
                                        WHERE date=(
                                        SELECT MAX(date) FROM Coviddata WHERE regionid=%s) AND regionid = %s''',[regid,regid])
            covserialize = CoviddataSerializer(covdata, many = True)
            covdict = covserialize.data
            for j in covdict:
                j["state"] = statename
                j["statecode"] = statename
                j["statenotes"] = ""
                alist.append(j)

        

        countrytimeseries = Coviddata.objects.raw('''SELECT * 
                                                     FROM Coviddata
                                                     WHERE regionid=%s
                                                     ORDER BY date''',[countryid])
        countrytimeseriesserialize = CoviddataSerializerfortimeseries(countrytimeseries, many = True)
        countrytimeseriesdata = countrytimeseriesserialize.data


        lists = {"cases_time_series": countrytimeseriesdata, "statewise" : alist}

        return Response(lists)
