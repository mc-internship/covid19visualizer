from rest_framework import serializers
from . models import Coviddata
from . models import RegionsHierarchy
from . models import Industrydata
from . models import Attributesdata
from . models import CvWorldFinal
from . models import Events
from . models import Coviddatacombined

class CoviddataSerializer(serializers.ModelSerializer):
    active = serializers.CharField(source='activecases')
    recovered = serializers.CharField(source='recoveredcases')
    deaths = serializers.CharField()
    deltadeaths = serializers.CharField(source='newdeaths')
    deltarecovered = serializers.CharField(source='newrecoveredcases')
    lastupdatedtime = serializers.DateField(source='date')
    confirmed = serializers.CharField(source='totalcases')
    deltaconfirmed = serializers.CharField(source='newtotalcases')

    class Meta:
        model = Coviddata
        fields = ['active', 'confirmed', 'deaths','deltaconfirmed', 'deltadeaths', 'deltarecovered',  'lastupdatedtime', 'recovered']


class RegionsHierarchySerializer(serializers.ModelSerializer):

    class Meta:
        model = RegionsHierarchy
        fields = '__all__'



class CoviddataSerializerfortimeseries(serializers.ModelSerializer):
    dailyconfirmed = serializers.CharField(source='newtotalcases')
    totalconfirmed = serializers.CharField(source='totalcases')    
    totalrecovered = serializers.CharField(source='recoveredcases')
    totaldeceased = serializers.CharField(source = 'deaths')
    dailydeceased = serializers.CharField(source='newdeaths')
    dailyrecovered = serializers.CharField(source='newrecoveredcases')
    

    class Meta:
        model = Coviddata
        fields = [ 'dailyconfirmed', 'dailydeceased', 'dailyrecovered', 'date', 'totalconfirmed', 'totaldeceased','totalrecovered']





class impactdataserializer(serializers.ModelSerializer):
    airlines = serializers.CharField()
    travel = serializers.CharField()
    retail = serializers.CharField()
    entertainment = serializers.CharField()
    food = serializers.CharField()

    class Meta:
        model = Industrydata
        fields = ['date', 'airlines', 'travel', 'retail', 'entertainment', 'food']



class allstatesdataserializer(serializers.ModelSerializer):
    
    class Meta:
        model = Coviddata
        fields = ['regionid', 'totalcases', 'deaths', 'recoveredcases', 'date']



class datesserializer(serializers.ModelSerializer):
    
    class Meta:
        model = Coviddata
        fields = ['date']

class attributedataserializer(serializers.ModelSerializer):

    class Meta:
        model = Attributesdata
        fields = '__all__'

class worlddataserializer(serializers.ModelSerializer):

    active = serializers.CharField(source='activecases')
    recovered = serializers.CharField(source='recoveredcases')
    deceased = serializers.CharField(source = 'deaths')
    confirmed = serializers.CharField(source='totalcases')
    deltaactive = serializers.CharField(source='newactivecases')
    deltarecovered = serializers.CharField(source='newrecoveredcases')
    deltadeceased = serializers.CharField(source = 'newdeaths')
    deltaconfirmed = serializers.CharField(source='newtotalcases')
    
    

    class Meta:
        model = CvWorldFinal
        fields = ['active','recovered','deceased','confirmed','deltaactive','deltarecovered','deltadeceased','deltaconfirmed','date']


class eventserializer(serializers.ModelSerializer):

    event = serializers.CharField(source='eventname')

    class Meta:
        model = Events
        fields = ['event','startdate','enddate']



class coviddatacombinedserializer(serializers.ModelSerializer):

    class Meta:
        model = Coviddatacombined
        fields = '__all__'
      