from __future__ import unicode_literals

from django.shortcuts import render

from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . models import Coviddata
from . models import RegionsHierarchy
from . models import Industrydata
from . models import Attributesdata
from . models import CvWorldFinal
from . models import Events
from . serializers import CoviddataSerializer
from . serializers import RegionsHierarchySerializer
from . serializers import CoviddataSerializerfortimeseries
from . serializers import impactdataserializer
from . serializers import allstatesdataserializer
from . serializers import datesserializer
from . serializers import attributedataserializer
from . serializers import worlddataserializer
from . serializers import eventserializer
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
              
                extraattribute = Attributesdata.objects.raw(''' SELECT * 
                                                        from AttributesData 
                                                        where RegionID = %s AND AttributeID in (1,2,3,4,5,6)''',[countryid])
                extraattributeserial = attributedataserializer(extraattribute, many = True)
                extraattributedict = extraattributeserial.data
                for v in extraattributedict:
                    if(v['attributeid'] == 1):
                        j["totalpop"] = str(v['value'])
                    elif(v['attributeid'] == 2):
                        j["female"] = str(v['value'])
                    elif(v['attributeid'] == 3):
                        j["male"] = str(v['value'])
                    elif(v['attributeid'] == 4):
                        j["children"] = str(v['value'])
                    elif(v['attributeid'] == 5):
                        j["adult"] = str(v['value'])
                    elif(v['attributeid'] == 6):
                        j["oldage"] = str(v['value'])   
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
                extraattribute = Attributesdata.objects.raw(''' SELECT * 
                                                                from AttributesData 
                                                                where RegionID = %s AND AttributeID in (1,2,3,4,5,6)''',[regid])
                extraattributeserial = attributedataserializer(extraattribute, many = True)
                extraattributedict = extraattributeserial.data
                for v in extraattributedict:
                    if(v['attributeid'] == 1):
                        j["totalpop"] = str(v['value'])
                    elif(v['attributeid'] == 2):
                        j["female"] = str(v['value'])
                    elif(v['attributeid'] == 3):
                        j["male"] = str(v['value'])
                    elif(v['attributeid'] == 4):
                        j["children"] = str(v['value'])
                    elif(v['attributeid'] == 5):
                        j["adult"] = str(v['value'])
                    elif(v['attributeid'] == 6):
                        j["oldage"] = str(v['value'])                
                
                alist.append(j)

        

        countrytimeseries = Coviddata.objects.raw('''SELECT * 
                                                     FROM Coviddata
                                                     WHERE regionid=%s
                                                     ORDER BY date''',[countryid])
        countrytimeseriesserialize = CoviddataSerializerfortimeseries(countrytimeseries, many = True)
        countrytimeseriesdata = countrytimeseriesserialize.data


        lists = {"cases_time_series": countrytimeseriesdata, "statewise" : alist}

        return Response(lists)







class covidimpact(APIView):

    def get(self,request, countryid):

        totaldata = Industrydata.objects.raw('''SELECT *
                                        FROM Industrydata
                                        WHERE regionid = %s''',[countryid])

        totalcovserialize = impactdataserializer(totaldata, many = True)

        totaldict = totalcovserialize.data

        return Response(totaldict)                                











class states_daily(APIView):

    def get(self, request, countryid):

        lists = []

        totaldates = Coviddata.objects.raw('''select [Date]
                                                from CovidData
                                                where RegionID in (select RegionID
                                                from Regions_Hierarchy
                                                where SuperRegionID = %s)
                                                GROUP By [Date]
                                                ORDER by [Date]''', [countryid])

        covserialize = datesserializer(totaldates, many = True)
        covdict = covserialize.data

        template = {}
        templatedata = RegionsHierarchy.objects.raw('''select * 
                                                    from Regions_Hierarchy      
                                                    where SuperRegionID=%s''',[countryid])
        templateserial = RegionsHierarchySerializer(templatedata, many = True)
        templatedict = templateserial.data
        for k in templatedict:
            nameofregionid = k['regionid']
            template[nameofregionid] = "0"

        lists = []

        allstatesdata = Coviddata.objects.raw('''select *
                                                    from CovidData
                                                    where RegionID in (select RegionID
                                                    from Regions_Hierarchy
                                                    where SuperRegionID = %s) AND [Date] in  (select [Date]
                                                                                                from CovidData
                                                                                                where RegionID in (select RegionID
                                                                                                from Regions_Hierarchy
                                                                                                where SuperRegionID = %s)
                                                                                                GROUP By [Date])''', [countryid, countryid])

        allstatesdataserial = allstatesdataserializer(allstatesdata, many = True)
        allstatesdatadict = allstatesdataserial.data

        
        for i in covdict:
            currdate = i['date']
            
            
            confirmeddict = template.copy()
            confirmeddict['status'] = 'confirmed'
            confirmeddict['date'] = currdate
            recovereddict = template.copy()
            recovereddict['status']  = 'recovered'
            recovereddict['date'] = currdate
            deceaseddict = template.copy()
            deceaseddict['date'] = currdate
            deceaseddict['status'] = 'deceased'
            

            for h in allstatesdatadict:
                if(h['date'] == currdate):
                    regionidname = h['regionid']
                    if(h['totalcases']):
                        confirmeddict[regionidname] = str(h['totalcases'])
                    if(h['recoveredcases']):    
                        recovereddict[regionidname] = str(h['recoveredcases'])
                    if(h['deaths']):    
                        deceaseddict[regionidname] =  str(h['deaths'])

            lists.append(confirmeddict)
            lists.append(recovereddict)
            lists.append(deceaseddict)

            
        ultimatedict = {"states_daily" : lists} 
        return Response(ultimatedict)








class countrywise_attribute(APIView):

    def get(self, request, countryid):

        extraattribute = Attributesdata.objects.raw(''' SELECT * 
                                                        from AttributesData 
                                                        where RegionID = %s''',[countryid])
        extraattributeserial = attributedataserializer(extraattribute, many = True)
        extraattributedict = extraattributeserial.data
        mapdict = {1:"totalpop", 2:"female", 3:"male",
        4:"children", 5:"adults", 6:"oldage", 7:"popdensity",
        8:"medianage", 9:"gni", 10:"diabetes", 11:"malesmokers",
        12:"femalesmokers"
        }
        dicts = {}
        for v in extraattributedict:
            attrid = v['attributeid']
            attrname = mapdict[attrid]
            dicts[attrname] = v['value']

        
        dictss = {"country":dicts}
        return Response(dictss)




class world(APIView):

    def get(self, request):

        worlddata = CvWorldFinal.objects.all()
        worlddataserial = worlddataserializer(worlddata, many = True)
        worlddict = worlddataserial.data

        return Response(worlddict)

class events(APIView):

    def get(self, request, countryid):

        eventdata = Events.objects.filter(regionid = countryid)
        eventdataserialize = eventserializer(eventdata, many = True)
        eventdict = eventdataserialize.data
        ultilist = []
        name = ""
        if(countryid == 1):
            name = "Germany"
        elif(countryid == 2):
            name = "India"
        elif(countryid == 3):
            name = "Italy"
        elif(countryid == 4):
            name = "Singapore"
        else:
            name = "USA"                

       
        ultidict = {"name" : name, "events"  : eventdict}

        return Response(ultidict)




class statedistrict(APIView):

    def get(self, request, countryid):

        statesindia = RegionsHierarchy.objects.filter(superregionid = countryid)
        statesindiaserialize = RegionsHierarchySerializer(statesindia, many = True)
        statesindiadict = statesindiaserialize.data

        finallist = []
        dict2 = {}

        for i in statesindiadict:
            stateid = i['regionid']
            statename = i['regionname']
            districtsindia = RegionsHierarchy.objects.filter(superregionid = stateid)
            districtsindiaserialize = RegionsHierarchySerializer(districtsindia, many = True)
            districtindiadict = districtsindiaserialize.data

            list1 = []
            dict1 = {}
            
            dict3 = {}

            for j in districtindiadict:
                
                districtid = j["regionid"]
                districtname = j['regionname']
                covdata = Coviddata.objects.raw('''SELECT *
                                            FROM Coviddata
                                            WHERE date=(
                                            SELECT MAX(date) FROM Coviddata WHERE regionid=%s) AND regionid = %s''',[districtid,districtid])
                covserialize = CoviddataSerializer(covdata, many = True)
                covdict = covserialize.data

                for k in covdict:
                    k['deceased'] = k['deaths']
                    k.pop('deaths')
                    k.pop('lastupdatedtime')
                    deltaconfirmed = k.pop('deltaconfirmed')
                    deltadeceased = k.pop('deltadeaths')
                    deltarecovered = k.pop('deltarecovered')
                    delta = {"confirmed": deltaconfirmed, "deceased": deltadeceased, "recovered": deltarecovered}
                    k["delta"] = delta
                    dict3[districtname] = k
             
            dict1["districtData"] = dict3
            dict1["statecode"] = "AB"
            dict2[statename] = dict1

            
            
        return Response(dict2)


            



        



        





            
                 




       








        
