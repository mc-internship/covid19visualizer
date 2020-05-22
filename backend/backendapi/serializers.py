from rest_framework import serializers
from . models import Coviddata
from . models import RegionsHierarchy
from . models import Industrydata

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